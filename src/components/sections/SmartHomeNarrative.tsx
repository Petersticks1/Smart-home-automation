import { VideoScrubber } from '../ui/VideoScrubber';

const rawMorning = import.meta.glob('../../assets/ezgif-38fa852f1ff2fb3e-jpg/*.webp', { eager: true, query: '?url', import: 'default' });
const morningFramesMap = rawMorning as Record<string, string>;

const rawAppliance = import.meta.glob('../../assets/ezgif-1354f6978a4e68c0-jpg/*.webp', { eager: true, query: '?url', import: 'default' });
const applianceFramesMap = rawAppliance as Record<string, string>;

export const getSortedUrls = (map: Record<string, string>) => {
  return Object.keys(map)
    .sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)\.webp$/)?.[1] || "0", 10);
      const numB = parseInt(b.match(/(\d+)\.webp$/)?.[1] || "0", 10);
      return numA - numB;
    })
    .map(k => map[k])
    // Skip every other frame to instantly double loading speed while maintaining a smooth enough framerate
    .filter((_, i) => i % 2 === 0);
};

export const morningFrames = getSortedUrls(morningFramesMap);
export const applianceFrames = getSortedUrls(applianceFramesMap);
export const ALL_NARRATIVE_FRAMES = [...morningFrames, ...applianceFrames];

const MORNING_SCENES = [
  { time: "07:00 AM", text: "" },
  { time: "07:01 AM", text: "" },
  { time: "07:02 AM", text: "" },
  { time: "07:03 AM", text: "" },
];

const APPLIANCE_SCENES = [
  { text: "Seamless Access Control at the Door" },
  { text: "Integrated Climate & Security" },
  { text: "Appliance Power Management" },
  { text: "Privacy & Ambiance in the Bedroom" },
];

export function SmartHomeNarrative() {
  const combinedFrames = ALL_NARRATIVE_FRAMES;

  const combinedScenes = [...MORNING_SCENES, ...APPLIANCE_SCENES];

  return (
    <VideoScrubber 
      id="smart-home-narrative" 
      frames={combinedFrames} 
      scenes={combinedScenes} 
      bgClassName="bg-black" 
      transitionIndex={morningFrames.length}
    />
  );
}
