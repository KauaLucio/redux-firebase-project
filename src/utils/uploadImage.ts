import { storage, ref, uploadBytes, getDownloadURL  } from "../services/firebaseConfig";

export async function uploadImage(image: File) {
  const storageRef = ref(storage, `profile_images/${image.name}`)
  await uploadBytes(storageRef, image)
  const urlPhoto = getDownloadURL(storageRef)

  return urlPhoto
}