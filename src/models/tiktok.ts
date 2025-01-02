/* eslint-disable @typescript-eslint/no-unused-vars */
//model for tiktok data
//models/tiktok.ts

// {"id":"7254764316308655387","author":{"username":"khaby.lame","nickname":"Khabane lame","verified":true,"signature":"If you want to laugh you are in the right place😎","avatar":"https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/e755d298d36b3175a2ca87d603b5dc2d~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=26984&refresh_token=a16ead45451a8d1e0290ba513d8ed53b&x-expires=1735981200&x-signature=rsP8QQnF7r5jl90H2V4xatPD4Qs%3D&shp=a5d48078&shcp=81f88b70","id":"127905465618821121"},"description":"I will come back tomorrow morning to bring you breakfast if you will be back #learnfromkhaby #comic #comedy","cover":"https://p16-sign-useast2a.tiktokcdn.com/obj/tos-useast2a-p-0037-euttp/c6b9b3e5e7da447da9a8e73ea59b5f5f_1689131545?lk3s=81f88b70&x-expires=1735981200&x-signature=YZ1LHAROlQRQ7a0noXZY393RJxk%3D&shp=81f88b70&shcp=-","stats":{"likes":2700000,"comments":11200,"views":33700000,"shares":12200,"saves":81864},"hashtags":[{"hashtagId":"1697657584273413","hashtagName":"learnfromkhaby"},{"hashtagId":"61870","hashtagName":"comic"},{"hashtagId":"1606334392378370","hashtagName":"comedy"}],"locationCreated":"IT","downloadUrl":"https://robotilab.xyz/download-api/tiktok/download?videoUrl=https://www.tiktok.com/@khaby.lame/video/7254764316308655387"}

// {"id":"127905465618821121","username":"khaby.lame","nickname":"Khabane lame","avatar":"https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/e755d298d36b3175a2ca87d603b5dc2d~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=30570&refresh_token=f77ef32b8fa495b73b3e9db3301bfa41&x-expires=1735981200&x-signature=rsP8QQnF7r5jl90H2V4xatPD4Qs%3D&shp=a5d48078&shcp=81f88b70","verified":true,"language":"en","nicknameLastModified":"1970-01-01T00:00:00.000Z","region":"IT","bio":"If you want to laugh you are in the right place😎","stats":{"following":80,"followers":162400000,"likes":2500000000,"videos":1251,"friends":72}}

interface tiktokVideoDownloader {
  id: string;
  author: {
    username: string;
    nickname: string;
    verified: boolean;
    signature: string;
    avatar: string;
    id: string;
  };
  description: string;
  cover: string;
  stats: {
    likes: number;
    comments: number;
    views: number;
    shares: number;
    saves: number;
  };
  hashtags: { hashtagId: string; hashtagName: string }[];
  locationCreated: string;
  downloadUrl: string;
}

interface TikTokUserProfile {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  verified: boolean;
  language: string;
  nicknameLastModified: string;
  region: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    likes: number;
    videos: number;
    friends: number;
  };
}
