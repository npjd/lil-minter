import { ImageType } from "react-images-uploading";

export default interface NFT {
    uri:string;
    address:string;
    image: ImageType;
    name:string;
    description:string;
}