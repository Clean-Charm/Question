import { type Page, type InsertPage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getAllPages(): Promise<Page[]>;
  getPageByNumber(pageNumber: number): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
}

export class MemStorage implements IStorage {
  private users: Map<string, any>;
  private pages: Map<number, Page>;

  constructor() {
    this.users = new Map();
    this.pages = new Map();
    this.initializePages();
  }

  private initializePages() {
    // Initialize all 50 pages with default content
    for (let i = 1; i <= 50; i++) {
      const page: Page = {
        id: randomUUID(),
        pageNumber: i,
        title: `페이지 ${String(i).padStart(2, '0')}`,
        content: `이것은 ${i}번째 페이지입니다. 총 50개의 페이지 중 하나를 보고 계십니다.`,
      };
      this.pages.set(i, page);
    }
  }

  async getUser(id: string): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPages(): Promise<Page[]> {
    return Array.from(this.pages.values()).sort((a, b) => a.pageNumber - b.pageNumber);
  }

  async getPageByNumber(pageNumber: number): Promise<Page | undefined> {
    return this.pages.get(pageNumber);
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const id = randomUUID();
    const page: Page = { ...insertPage, id };
    this.pages.set(page.pageNumber, page);
    return page;
  }
}

export const storage = new MemStorage();
