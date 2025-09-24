import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for page management
  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error) {
      console.error("Error fetching pages:", error);
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:pageNumber", async (req, res) => {
    try {
      const pageNumber = parseInt(req.params.pageNumber, 10);
      if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 50) {
        return res.status(400).json({ error: "Invalid page number" });
      }

      const page = await storage.getPageByNumber(pageNumber);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      res.json(page);
    } catch (error) {
      console.error("Error fetching page:", error);
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  // Serve static audio file (placeholder route)
  app.get("/bgm.mp3", (req, res) => {
    // In a real implementation, you would serve an actual audio file
    // For now, return a 204 No Content to prevent 404 errors
    res.status(204).send();
  });

  const httpServer = createServer(app);
  return httpServer;
}
