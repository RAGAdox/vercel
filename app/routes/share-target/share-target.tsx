import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/share-target";

interface ISpotifyImage {
  url: string;
  width: number;
  height: number;
}
interface ISpotifyTrackDetails {
  name: string;
  popularity?: number;
  images: ISpotifyImage[];
  uri: string;
}

type IloaderData =
  | {
      spotifyTrackDetails: ISpotifyTrackDetails;
      error: false;
    }
  | { error: true };

function isValidSpotifyURL(url: string) {
  if (url && url !== "") {
    const spotifyTrackRegex =
      /^https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)(\?.*)?$/;
    const match = url.match(spotifyTrackRegex);
    if (match) {
      const trackId = match[1];
      return { isValid: true, trackId };
    }
  }
  return { isValid: false };
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<IloaderData> {
  try {
    const url = new URL(request.url);
    const spotifyUrl = url.searchParams.get("text") || "";
    console.log(
      "process.env.VITE_HOST_API====>",
      import.meta.env.VITE_HOST_API
    );
    const host = import.meta.env.VITE_HOST_API || url.hostname;
    const protocol = import.meta.env.VITE_HOST_API_PROTOCOL || "https";
    const validationResult = isValidSpotifyURL(spotifyUrl);
    if (validationResult.isValid) {
      const functionUrl = `${protocol}://${host}/api/track?trackId=${validationResult.trackId}`;
      console.log("functionURL ===>", functionUrl);
      const response = await fetch(functionUrl);
      console.log("Response Status===>", response.status);
      if (!response.ok) {
        throw new Error(`Unable to get data \n Status ${response.status}`);
      }
      const data = await response.json();
      return { spotifyTrackDetails: data, error: false };
    }
    throw new Error("Invalid Spotify URL");
  } catch (error) {
    console.error("Error fetching Track", error);
    return { error: true };
  }
}

const ShareTarget = ({ loaderData }: Route.ComponentProps) => {
  const { error } = loaderData;
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(
        () => navigate("/", { replace: true, viewTransition: true }),
        3000
      );
    }
  }, [error]);

  return error === true ? (
    <div>
      <p>Link was unprocessable</p>
      <p>Redirecting in 3 seconds</p>
    </div>
  ) : (
    <>
      <img src={loaderData.spotifyTrackDetails.images[1].url} />
      <p>{loaderData.spotifyTrackDetails.name}</p>
    </>
  );
};

export default ShareTarget;
