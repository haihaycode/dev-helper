import Axios from "@/api/axios";
import { TikTokUserProfile, tiktokVideoDownloader } from "@/models/tiktok";

const RAPIDAPI_HOST = "tiktok-video-downloader-api.p.rapidapi.com";
const RAPIDAPI_KEY = "6782cb93a8msh46f800d5ec2578ep106394jsn22146dd2976a";

export const getTikTokUserProfile = async (
  username: string
): Promise<TikTokUserProfile> => {
  try {
    const response = await Axios.get(
      `https://${RAPIDAPI_HOST}/user/${username}`,
      {
        headers: {
          "x-rapidapi-host": RAPIDAPI_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
      }
    );
    return response.data as TikTokUserProfile;
  } catch (error) {
    console.error("Error fetching TikTok user profile:", error);
    throw error;
  }
};

export const getTikTokVideo = async (
  videoUrl: string
): Promise<tiktokVideoDownloader> => {
  try {
    const response = await Axios.get(`https://${RAPIDAPI_HOST}/media`, {
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
      params: {
        videoUrl: videoUrl,
      },
    });
    return response.data as tiktokVideoDownloader;
  } catch (error) {
    console.error("Error fetching TikTok video:", error);
    throw error;
  }
};
