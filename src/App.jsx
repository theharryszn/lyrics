import { PauseCircle, PlayCircle } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { track } from "./data";
import { motion, useMotionValue } from "framer-motion";

const Line = ({
  currentTime,
  line,
  i,
  translationY,
  setCurrentIndex,
  currentIndex,
}) => {
  const ref = useRef(null);
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    if (currentTime >= timeString(line.time) - 1) {
      if (!moved) {
        const prev = translationY.get();
        translationY.set(prev + ref.current.getBoundingClientRect().top - 100);
        setMoved(true);
        setCurrentIndex(i);
      }
    }
  }, [
    currentTime,
    i,
    line.time,
    ref,
    translationY,
    setMoved,
    moved,
    setCurrentIndex,
  ]);

  return (
    <motion.div
      ref={ref}
      className="text-4xl font-extrabold py-10"
      animate={{
        opacity: currentIndex === i ? 1 : 0.2,
        filter: currentIndex === i ? "blur(0px)" : "blur(4px)",
      }}
    >
      {line.line}
    </motion.div>
  );
};

const timeString = (str) => {
  const arr = str.split(":");
  const mins = Number(arr[0]);
  const secs = Number(arr[1]);

  return mins * 60 + secs;
};

function App() {
  const [currentTime, setCurrentTime] = useState(0.0);
  const translationY = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  return (
    <div className="w-screen h-screen">
      <img
        src={require("./assets/artwork.jpg")}
        alt="Loi- Gold"
        className="w-full h-full object-cover"
      />
      <audio
        src={track.src}
        ref={audioRef}
        onTimeUpdate={(e) => {
          console.log(e.target.currentTime);
          setCurrentTime(e.target.currentTime);
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onEnded={() => {
          setIsPlaying(false);
        }}
      ></audio>
      <div className="bg-black/80 backdrop-blur-xl w-screen h-screen fixed top-0 left-0 z-10 text-white">
        <div className="flex flex-row items-center justify-between p-5  md:px-20 absolute top-0 w-full">
          <div>
            <div className="text-lg font-semibold">{track.title}</div>
            <div className="text-xs">{track.artiste}</div>
          </div>
          <div>
            {isPlaying ? (
              <PauseCircle
                color="white"
                weight="fill"
                size={30}
                onClick={() => {
                  audioRef.current.pause();
                }}
              />
            ) : (
              <PlayCircle
                color="white"
                weight="fill"
                size={30}
                onClick={() => {
                  audioRef.current.play();
                }}
              />
            )}
          </div>
        </div>
        <motion.div
          className="p-10 md:p-20 py-20 flex flex-col gap-5"
          animate={{
            translateY: translationY.get() * -1,
          }}
        >
          <motion.div
            animate={{
              opacity: currentIndex === -1 ? 1 : 0.2,
              filter: currentIndex === -1 ? "blur(0px)" : "blur(4px)",
            }}
            className="text-4xl font-extrabold py-10"
          >
            ...
          </motion.div>
          {track.lyrics.map((line, key) => {
            return (
              <Line
                key={key}
                line={line}
                i={key}
                currentTime={currentTime}
                translationY={translationY}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            );
          })}
          <motion.div
            animate={{
              opacity: currentIndex === -1 ? 1 : 0.2,
            }}
            className="text-sm font-medium py-10"
          >
            Songwriters: Felix Jeremias Volk / Leonie Greiner / René Müller /
            Simon Klose <br />
            Gold lyrics © Sony/ATV Music Publishing LLC <br />
            Source: LyricFind <br />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
