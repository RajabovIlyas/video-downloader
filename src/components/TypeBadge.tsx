import { TypeTags } from "@/enums/type-tags.enum";

interface TypeBadgeProps {
  type: TypeTags;
}

const TYPE_STYLE = {
  [TypeTags.audio]: {
    title: TypeTags.audio,
    style:
      "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300",
  },
  [TypeTags.video]: {
    title: TypeTags.video,
    style:
      "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300",
  },
  [TypeTags.subtitle]: {
    title: TypeTags.subtitle,
    style:
      "bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",
  },
  [TypeTags.videoFull]: {
    title: "full",
    style:
      "bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300",
  },
};

function TypeBadge({ type }: TypeBadgeProps) {
  const { title, style } = TYPE_STYLE[type];
  return <span className={style}>{title}</span>;
}

export default TypeBadge;
