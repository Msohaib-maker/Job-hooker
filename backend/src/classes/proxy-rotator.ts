import * as fs from "fs";
import * as path from "path";

export class ProxyRotator {
  private proxies: string[];
  private index = 0;

  constructor() {
    const filePath = path.join(__dirname, "../../..", "proxy.txt");
    this.proxies = fs
      .readFileSync(filePath, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
  }

  getNext() {
    const proxy = this.proxies[this.index];
    this.index = (this.index + 1) % this.proxies.length;

    const [host, port, username, password] = proxy.split(":");

    return { host, port, username, password };
  }
}
