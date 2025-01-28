import { useEffect, useState } from "react";
import { Link } from "react-router";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      // Prevent the mini-infobar from appearing
      event.preventDefault();
      // Save the event for triggering install later
      setDeferredPrompt(event);
      setIsInstallable(true); // Show the install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the PWA installation");
    } else {
      console.log("User dismissed the PWA installation");
    }

    // Reset the deferred prompt variable
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <>
      {isInstallable ? (
        <button
          className="border px-4 py-2 rounded-xl mt-3 text-sm hover:bg-gray-100 hover:text-black"
          onClick={handleInstallClick}
        >
          Install Application
        </button>
      ) : (
        <></>
      )}
      <Link to="/share-target">
        <button className="border px-4 py-2 rounded-xl mt-3 text-sm hover:bg-gray-100 hover:text-black">
          Share Target
        </button>
      </Link>
      <Link to="/invalid-target">
        <button className="border px-4 py-2 rounded-xl mt-3 text-sm hover:bg-gray-100 hover:text-black">
          Invalid Target
        </button>
      </Link>
    </>
  );
};

export default InstallButton;
