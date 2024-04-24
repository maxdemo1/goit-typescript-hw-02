/* imageItem.urls.small
dataModal.urls.full
dataModal.description
imageItem.id
 */
export interface ImageData {
  id: string;
  description: string | undefined;
  urls: {
    full: string;
    small: string;
  };
}

export type openModalFunc = (imageData: ImageData) => void;
