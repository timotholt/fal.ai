import { config } from 'dotenv';
import { fal } from "@fal-ai/client";

// Load environment variables from .env file
config();

// Configure the Fal client with your API key
fal.config({
  credentials: process.env.FAL_KEY
});

async function generateImage() {
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt: "profile shot of a beautiful thin young korean asian female curvy influencer with black short hair sitting at the dinner table staring at the camera.  she is wearing a simple top and stockings and high heels.  the atmosphere is inviting.   bokeh, cinematic, soft lighting, professional studio portrait.   she has very minimal makeup, no lipstick.",
        image_size: { width: 1024, height: 768 },
        guidance_scale: 4.0,
        num_inference_steps: 30,
        num_images: 1,
        enable_safety_checker: false,
        output_format: "png",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    
    console.log("Generation complete!");
    console.log("Result URL:", result.data?.images?.[0]?.url || "No image URL found");
    console.log("Request ID:", result.requestId);
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

// Execute the function
generateImage();
