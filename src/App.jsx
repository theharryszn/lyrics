import {
  CaretLeft,
  CaretRight,
  Circle,
  InstagramLogo,
  MicrophoneStage,
  Pause,
  Play,
} from "phosphor-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { tracks } from "./data";
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
        translationY.set(
          prev +
            ref.current.getBoundingClientRect().top -
            window.innerHeight * 0.2
        );
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
  const translationX = useMotionValue(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(
    tracks[Math.floor(Math.random() * tracks.length)]
  );

  const play = useCallback(() => {
    audioRef.current.play();
    translationX.set(0);
  }, [translationX]);

  const playTrack = useCallback(
    (trk) => {
      setTrack(trk);
      setCurrentIndex(0.0);
      translationX.set(0);
      translationY.set(0);
      setCurrentIndex(-1);
      setIsPlaying(true);
    },
    [translationX, translationY]
  );

  const pause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const audioRef = useRef(null);
  return (
    <div className="w-screen h-screen lowercase">
      <img
        src={track.artwork}
        alt="Loi- Gold"
        className="w-full h-full object-cover"
      />
      <audio
        src={track.src}
        ref={audioRef}
        onTimeUpdate={(e) => {
          setCurrentTime(e.target.currentTime);
        }}
        onCanPlay={() => {
          if (isPlaying) {
            play();
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onEnded={() => {
          setIsPlaying(false);
          playTrack(
            tracks.filter((trk) => trk.name !== track.name)[
              Math.floor(Math.random() * tracks.length)
            ]
          );
        }}
      ></audio>
      <div className="w-screen h-screen bg-black/90 backdrop-blur-xl fixed top-0 left-0"></div>
      <motion.div className="w-screen h-screen text-white fixed top-0 left-0 z-10">
        <div className="flex flex-row gap-20 items-center justify-between p-10 md:px-20 relative z-[9999]">
          <div>
            <div className="font-bold leading-relaxed flex items-center gap-2 text-sm text-gray-400">
              <InstagramLogo color="white" />
              <a
                className="text-white"
                href="https://www.instagram.com/abidemi_harry/"
                target="_blank"
                rel="noreferrer"
              >
                @abidemi_harry
              </a>
            </div>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              translationX.set(0);
            }}
          >
            <MicrophoneStage color="white" weight="bold" size={20} />
            <CaretRight color="white" weight="bold" size={20} />
          </div>
        </div>
        <div className="text-sm font-semibold opacity-80 p-10 md:px-20">
          available tracks.....ikr 😂💔
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10">
          {tracks.map((trk, i) => {
            return (
              <div
                key={i}
                className="flex flex-row items-center justify-between py-5 px-10 md:px-20 relative z-50 gap-5"
              >
                <div className="flex flex-row gap-5 items-center">
                  {track.title === trk.title ? (
                    <Circle className="text-green-500" size={10} />
                  ) : (
                    <span>{i + 1}.</span>
                  )}
                  <img
                    src={trk.artwork}
                    alt="artwork"
                    className="w-10 aspect-square object-cover border border-white"
                  />
                  <div>
                    <div className="text-lg font-semibold">{trk.title}</div>
                    <div className="text-xs">{trk.artiste}</div>
                  </div>
                </div>
                <div>
                  {track.title === trk.title ? (
                    isPlaying ? (
                      <Pause
                        color="white"
                        weight="fill"
                        size={25}
                        onClick={pause}
                      />
                    ) : (
                      <Play
                        color="white"
                        weight="fill"
                        size={25}
                        onClick={play}
                      />
                    )
                  ) : (
                    <Play
                      color="white"
                      weight="fill"
                      size={25}
                      onClick={() => playTrack(trk)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        initial={{
          translateX: window.innerWidth,
        }}
        animate={{
          translateX: translationX.get(),
        }}
        className="backdrop-blur-xl w-screen h-screen fixed top-0 left-0 z-20 text-white"
      >
        <div className="flex flex-row items-center justify-between p-10 md:px-20 relative z-50 gap-5">
          <div className="flex flex-row gap-5 items-center">
            <CaretLeft
              color="white"
              weight="bold"
              size={30}
              onClick={() => {
                translationX.set(window.innerWidth);
              }}
              className="cursor-pointer"
            />
            <img
              src={track.artwork}
              alt="artwork"
              className="w-10 min-w-[2.5rem] aspect-square object-cover border border-white"
            />
            <div>
              <div className="text-sm md:text-lg font-semibold">
                {track.title}
              </div>
              <div className="text-xs">{track.artiste}</div>
            </div>
          </div>
          <div>
            {isPlaying ? (
              <Pause color="white" weight="fill" size={30} onClick={pause} />
            ) : (
              <Play color="white" weight="fill" size={30} onClick={play} />
            )}
          </div>
        </div>
        <motion.div
          className="p-10 md:px-20 py-10 flex flex-col gap-5"
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
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
