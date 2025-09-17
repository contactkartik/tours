import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Experience routes
  app.get("/api/experiences", async (req, res) => {
    try {
      const { category, location, featured, search } = req.query;
      
      const filters: any = {};
      if (category) filters.category = category as string;
      if (location) filters.location = location as string;
      if (featured) filters.featured = featured === 'true';
      if (search) filters.search = search as string;

      const experiences = await storage.getExperiences(filters);
      res.json(experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      res.status(500).json({ error: 'Failed to fetch experiences' });
    }
  });

  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const experience = await storage.getExperience(req.params.id);
      if (!experience) {
        return res.status(404).json({ error: 'Experience not found' });
      }
      res.json(experience);
    } catch (error) {
      console.error('Error fetching experience:', error);
      res.status(500).json({ error: 'Failed to fetch experience' });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Verify experience exists
      const experience = await storage.getExperience(bookingData.experienceId);
      if (!experience) {
        return res.status(400).json({ error: 'Experience not found' });
      }

      // Calculate total amount
      const pricePerPerson = parseFloat(experience.price);
      const totalAmount = pricePerPerson * bookingData.guests;

      const booking = await storage.createBooking({
        ...bookingData,
        totalAmount: totalAmount.toString()
      });

      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: error.errors 
        });
      }
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  });

  // Get all bookings (admin endpoint)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // Search and categories endpoint
  app.get("/api/categories", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      const categories = Array.from(new Set(experiences.map(exp => exp.category)));
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  // Popular destinations endpoint
  app.get("/api/destinations", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      const destinations = Array.from(new Set(experiences.map(exp => exp.location)));
      res.json(destinations);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      res.status(500).json({ error: 'Failed to fetch destinations' });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}