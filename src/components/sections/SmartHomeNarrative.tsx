import { VideoScrubber } from '../ui/VideoScrubber';

const rawMorning = import.meta.glob('../../assets/ezgif-38fa852f1ff2fb3e-jpg/*.jpg', { eager: true, query: '?url', import: 'default' });
const morningFramesMap = rawMorning as Record<string, string>;

const rawAppliance = import.meta.glob('../../assets/ezgif-1354f6978a4e68c0-jpg/*.jpg', { eager: true, query: '?url', import: 'default' });
const applianceFramesMap = rawAppliance as Record<string, string>;

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
  const getSortedUrls = (map: Record<string, string>) => {
    return Object.keys(map)
      .sort((a, b) => {
        const numA = parseInt(a.match(/(\d+)\.jpg$/)?.[1] || "0", 10);
        const numB = parseInt(b.match(/(\d+)\.jpg$/)?.[1] || "0", 10);
        return numA - numB;
      })
      .map(k => map[k]);
  };

  const morningFrames = getSortedUrls(morningFramesMap);
  const combinedFrames = [
    ...morningFrames,
    ...getSortedUrls(applianceFramesMap)
  ];

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
