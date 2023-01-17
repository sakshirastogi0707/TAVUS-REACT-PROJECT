import { baseUrl, urls } from "../../config/urlConfig";
import { HTTP, HTTP2 } from "../core/http.service";
import {
  StorageKeys,
  StorageService,
  TempStorage,
} from "../core/storage.service";
import Utils from "../core/utils";

class VideoService {
  static async saveVideo(body) {
    const url = urls.requests;
    try {
      const result = await HTTP.post(url, body);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async uploadVideos(data) {
    const url = urls.uploadVideos;
    try {
      const result = await HTTP.post(url, data);
      if (result.data) {
        return result.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async getVideos(video_id) {
    const url = urls.videos + "/" + video_id;
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        return result.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async updateVideo(body, id) {
    const url = `${urls.requests}/${id}`;
    try {
      const result = await HTTP.patch(url, body);
      if (result.data) {
        return result.data.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async regenrateVideo(id) {
    const url = `${urls.requests}/${id}`;
    try {
      const result = await HTTP.put(url);
      if (result.data) {
        return result.data;
      }
      return undefined;
    } catch (e) {
      return;
    }
  }

  static async getRequests(params) {
    var url = urls.requests + Utils.getUrlParamString(params, true);
    try {
      const result = await HTTP.get(url);
      if (result.data) {
        const data = result.data.data.results.map((r) => {
          return {
            ...r,
            ...r.data,
            created_at: Utils.getFormattedDate(r.created_at),
          };
        });
        return { data, next_cursor: result.data.data.next_cursor };
      }
      return {};
    } catch (e) {
      return {};
    }
  }

  static async getCSVRequests() {
    let params = "?limit=10";
    try {
      const result = await HTTP.get(urls.bulkRequest + params);
      if (result.data) {
        return result.data.data.rows.map((r) => {
          return {
            ...r,
            title: r.original_csv ? r.original_csv.split("/").slice(-1) : "",
          };
        });
      }
      return [];
    } catch (e) {
      return [];
    }
  }
}

export { VideoService };
