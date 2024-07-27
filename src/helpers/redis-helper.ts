import { createClient, SetOptions } from "redis";

class RedisService {
  static async __int() {
    return await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
  }

  // EX option is second number
  static async set(key: string, value: any, option?: SetOptions) {
    (await this.__int()).set(key, value, option);
  }

  static async get(key: string) {
    return (await this.__int()).get(key);
  }

  static async delete(key: string) {
    (await this.__int()).del(key);
  }
}

export default RedisService;
