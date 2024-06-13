import { TypeTags } from "@/enums/type-tags.enum";

interface TypeBadgeProps {
  tag: TypeTags;
}

const TYPE_STYLE = {
  [TypeTags.audio]:
    "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300",
  [TypeTags.video]:
    "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300",
  [TypeTags.subtitle]:
    "bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",
};

function TypeBadge({ tag }: TypeBadgeProps) {
  return <span className={TYPE_STYLE[tag]}>{tag}</span>;
}

export default TypeBadge;
