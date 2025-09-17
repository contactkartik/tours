import { type User, type InsertUser, type Experience, type InsertExperience, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Experience methods
  getExperiences(filters?: {
    category?: string;
    location?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByExperience(experienceId: string): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private experiences: Map<string, Experience>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.experiences = new Map();
    this.bookings = new Map();
    
    // Seed with sample experiences
    this.seedExperiences();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Experience methods
  async getExperiences(filters?: {
    category?: string;
    location?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Experience[]> {
    let experiences = Array.from(this.experiences.values());

    if (filters) {
      if (filters.category) {
        experiences = experiences.filter(exp => 
          exp.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }
      if (filters.location) {
        experiences = experiences.filter(exp => 
          exp.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.featured !== undefined) {
        experiences = experiences.filter(exp => exp.featured === filters.featured);
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        experiences = experiences.filter(exp => 
          exp.title.toLowerCase().includes(searchTerm) ||
          exp.location.toLowerCase().includes(searchTerm) ||
          exp.category.toLowerCase().includes(searchTerm)
        );
      }
    }

    return experiences.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = randomUUID();
    const experience: Experience = { 
      ...insertExperience, 
      id,
      createdAt: new Date(),
      originalPrice: insertExperience.originalPrice || null,
      description: insertExperience.description || null,
      inclusions: insertExperience.inclusions as string[] || null,
      exclusions: insertExperience.exclusions as string[] || null,
      highlights: insertExperience.highlights as string[] || null
    };
    this.experiences.set(id, experience);
    return experience;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date(),
      specialRequests: insertBooking.specialRequests || null,
      status: insertBooking.status || "pending"
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookingsByExperience(experienceId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.experienceId === experienceId
    );
  }

  private seedExperiences() {
    const sampleExperiences = [
      {
        title: "Amazing Rajasthan Desert Safari",
        location: "Jaisalmer, Rajasthan",
        price: "2499.00",
        originalPrice: "3499.00",
        rating: "4.8",
        reviewCount: 127,
        duration: "3 Days",
        groupSize: "2-8 People",
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
        featured: true,
        description: "Experience the magic of the Thar Desert with camel rides, traditional Rajasthani folk performances, and nights under the starlit sky in luxury desert camps.",
        inclusions: ["Desert camp accommodation", "Camel safari", "Traditional meals", "Folk dance performance", "Transportation"],
        exclusions: ["Personal expenses", "Tips", "Travel insurance"],
        highlights: ["Sunset camel ride", "Traditional Rajasthani dinner", "Star gazing", "Folk music and dance"]
      },
      {
        title: "Kerala Backwater Cruise",
        location: "Alleppey, Kerala",
        price: "1899.00",
        rating: "4.7",
        reviewCount: 89,
        duration: "2 Days",
        groupSize: "2-6 People",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        featured: false,
        description: "Glide through the serene backwaters of Kerala on a traditional houseboat, witnessing village life and enjoying authentic Kerala cuisine.",
        inclusions: ["Houseboat stay", "All meals", "Local guide", "Village visit"],
        exclusions: ["Airfare", "Personal expenses", "Beverages"],
        highlights: ["Houseboat experience", "Traditional Kerala meals", "Village interaction", "Scenic backwaters"]
      },
      {
        title: "Himalayan Trek Experience",
        location: "Manali, Himachal Pradesh",
        price: "3299.00",
        originalPrice: "3999.00",
        rating: "4.9",
        reviewCount: 156,
        duration: "5 Days",
        groupSize: "4-12 People",
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        featured: true,
        description: "Trek through pristine Himalayan trails with breathtaking mountain views, alpine meadows, and traditional mountain villages.",
        inclusions: ["Professional guide", "Camping equipment", "Meals during trek", "Permits"],
        exclusions: ["Personal gear", "Insurance", "Emergency evacuation"],
        highlights: ["Mountain views", "Alpine meadows", "Village visits", "Camping under stars"]
      },
      {
        title: "Goa Beach Paradise",
        location: "North Goa, Goa",
        price: "1299.00",
        rating: "4.5",
        reviewCount: 203,
        duration: "1 Day",
        groupSize: "1-10 People",
        category: "Beach",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        featured: false,
        description: "Enjoy sun, sand, and sea with water sports, beach activities, and delicious Goan seafood.",
        inclusions: ["Beach activities", "Water sports", "Lunch", "Transportation"],
        exclusions: ["Alcohol", "Personal expenses", "Additional activities"],
        highlights: ["Water sports", "Beach activities", "Goan cuisine", "Sunset views"]
      },
      {
        title: "Tamil Nadu Temple Tour",
        location: "Madurai, Tamil Nadu",
        price: "1799.00",
        rating: "4.6",
        reviewCount: 94,
        duration: "2 Days",
        groupSize: "3-15 People",
        category: "Cultural",
        image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=400&h=300&fit=crop",
        featured: false,
        description: "Explore ancient Dravidian temples with intricate architecture and rich spiritual heritage.",
        inclusions: ["Temple visits", "Local guide", "Transportation", "Cultural insights"],
        exclusions: ["Accommodation", "Meals", "Personal expenses"],
        highlights: ["Ancient architecture", "Spiritual experience", "Cultural heritage", "Local traditions"]
      },
      {
        title: "Mumbai Street Food Tour",
        location: "Mumbai, Maharashtra",
        price: "599.00",
        rating: "4.4",
        reviewCount: 178,
        duration: "4 Hours",
        groupSize: "2-8 People",
        category: "Food",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
        featured: false,
        description: "Discover Mumbai's vibrant street food culture with tastings at iconic local spots and hidden gems.",
        inclusions: ["Food tastings", "Local guide", "Walking tour", "Cultural insights"],
        exclusions: ["Transportation", "Additional food", "Beverages"],
        highlights: ["Street food varieties", "Local culture", "Hidden gems", "Food stories"]
      }
    ];

    sampleExperiences.forEach(exp => {
      const id = randomUUID();
      const experience: Experience = {
        ...exp,
        id,
        createdAt: new Date(),
        originalPrice: exp.originalPrice || null,
        description: exp.description || null,
        inclusions: exp.inclusions || null,
        exclusions: exp.exclusions || null,
        highlights: exp.highlights || null
      };
      this.experiences.set(id, experience);
    });
  }
}

export const storage = new MemStorage();