import axios from "axios";
import React, { useState } from "react";
import { RingLoader } from "react-spinners";

const ImageGenerator = () => {
  // state_variables
  const [payload, setPayload] = useState({
    prompt: "",
    aspect_ratio: "1:1",
    seed: "5",
    style_preset: "anime",
    output_format: "png",
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // inputvchange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  // form submit handler
  const formSubmitHandler = async (e) => {
    e.preventDefault(); //prevent reload on form submit
    console.log("Request sent.", payload); //viewing all submitted form data in browser console

    setImageSrc(null);
    setLoading(true);
    setError(false);

    //api key and url
    const apiURL = import.meta.env.VITE_ECHO_API_URL;
    const apiKEY = import.meta.env.VITE_ECHO_API_KEY;

    try {
      const response = await axios.post(apiURL, payload, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${apiKEY}`,
          Accept: "image/*",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setLoading(false);
        console.log("success");
        const blob = new Blob([response.data], { type: "image/webp" });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        console.error("Error: ${response.status} - ${response.statusText}");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error generating image.", error);
    }
  };

  return (
    <div className="max-w-screen-xl px-5 mx-auto mt-5">
      <div className="relative p-0.5">
        {/* Border Animation Layer */}
        <div className="absolute inset-0 animate-gradient-border bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl"></div>

        {/* Inner Box */}
        <div className="relative bg-white dark:bg-slate-900/98 p-6 rounded-xl border-2 border-transparent">
            <div className="flex flex-row gap-5 justify-between p-6">
            {/* options */}
            <div className="block w-xl">
            <form action="" onSubmit={formSubmitHandler}>
                {/* prompt */}
                <div className="mb-7">
                <label htmlFor="prompt" className="form-label">
                    Prompt
                </label>

                <textarea
                    id="prompt"
                    rows="4"
                    name="prompt"
                    value={payload.prompt}
                    onChange={handleChange}
                    placeholder="A cat with ice-cream"
                    required
                    className="block w-full h-38 p-3 bg-transparent border-2 border-purple-500/80 focus-within:outline-0 focus:border-purple-500 rounded-lg font-roboto-mono"
                ></textarea>
                </div>

                {/* style */}
                <div className="mb-7">
                <label htmlFor="style" className="form-label">
                    Image Style
                </label>

                <select
                    id="style"
                    name="style_preset"
                    value={payload.style_preset}
                    onChange={handleChange}
                    className="block w-full p-3 bg-transparent border-2 rounded-lg border-purple-500/80 focus-within:outline-0 focus:border-purple-500 font-roboto-mono"
                >
                    <option value="anime">Anime</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="photographic">Photographic</option>
                    <option value="neon-punk">Neon Punk</option>
                    <option value="3d-model">3D Model</option>
                </select>
                </div>

                {/* format */}
                <div className="mb-7">
                <label htmlFor="format" className="form-label">
                    Image Format
                </label>

                <select
                    id="format"
                    name="output_format"
                    value={payload.output_format}
                    onChange={handleChange}
                    className="block w-full p-3 bg-transparent border-2 rounded-lg border-purple-500/80 focus-within:outline-0 focus:border-purple-500 font-roboto-mono"
                >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                </select>
                </div>

                {/* button */}
                <div className="">
                <button
                    type="submit"
                    className="flex items-center justify-center w-full gap-2 px-10 py-2 text-xl font-semibold font-space-mono text-center bg-pink-700/90 border-2 border-pink-700 rounded-md"
                >
                    <span>Generate Image</span>
                    <img className="w-10" src="/generate.png" alt="" />
                </button>
                </div>
            </form>
            </div>

            {/* generated image */}
            <div className="block">
            <div className="content-center border-2 border-purple-500/80 rounded-md mx-auto lg:ms-auto overflow-clip w-[500px] h-[500px]">
                {loading ? (
                <div role="status" className="flex items-center justify-center gap-2">
                        <span className="text text-purple-300 font-roboto-mono">Generating</span>
                        <RingLoader
                            color="#D8B4FE"
                            size={30}
                            />
                </div>
                ) : error ? (
                <p className="text-center font-roboto-mono text-amber-400">
                    Something went wrong, try again.
                </p>
                ) : imageSrc ? (
                <img className="mx-auto" src={imageSrc} />
                ) : (
                <img src="/logo2.png" className="mx-auto w-20"></img>
                )}
            </div>
            </div>
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default ImageGenerator;
