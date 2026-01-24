// components/ReusableSection.tsx
import SkeletonCard from "./SkeletonCard";
import Toggler, { Option } from "./Toggler";

interface ReusableSectionProps<TCategory extends string, TItem> {
  title: string;
  options: readonly Option<TCategory>[];
  activeCategory: TCategory;
  setActiveCategory: (value: TCategory) => void;
  data: Partial<Record<TCategory, TItem[]>>;
  renderItem: (item: TItem) => JSX.Element;
  /**
   * Optional: class(es) to apply to the container that wraps the list of items.
   * Default keeps the old behaviour (horizontal grid flow). Override it when a
   * section needs a different layout (e.g. LatestTrailers uses a flex scroller).
   */
  itemsContainerClassName?: string;
  isLoading?: boolean;
  section?: "movies" | "trailers";
  skeletonCount?: number;
  skeletonType?: "portrait" | "landscape";
}

function ReusableSection<TCategory extends string, TItem>({
  title,
  options,
  activeCategory,
  setActiveCategory,
  data,
  renderItem,
  itemsContainerClassName,
  isLoading = false,
  section,
  skeletonCount = 6,
  skeletonType = "portrait",
}: ReusableSectionProps<TCategory, TItem>) {
  const items = data[activeCategory] ?? [];

  // sensible default: horizontal flow with gap (keeps previous behaviour)
  const defaultItemsClass = "grid grid-flow-col overflow-x-auto gap-4";
  const itemsClass = itemsContainerClassName ?? defaultItemsClass;
  const contentToRender = isLoading ? Array.from({ length: skeletonCount }) : items;

  return (
    <section className="px-[clamp(2rem,15vw,15rem)]">
      <div className="flex items-center justify-between py-[clamp(0.5rem,1vw,1rem)]">
        <h2 className="text-[clamp(1rem,1vw,1.2rem)] font-semibold">{title}</h2>
        <Toggler
          options={options}
          active={activeCategory}
          onToggle={setActiveCategory}
          section={section}
        />
      </div>

      <div className="relative">
        <div className={itemsClass}>
          {isLoading || items.length === 0
            ? contentToRender.map((_, i) => (
               <SkeletonCard key={`skeleton-${i}`} variant={skeletonType} />
              ))
            : (contentToRender as TItem[]).map((item: any) => renderItem(item))}
        </div>
      </div>
    </section>
  );
}

export default ReusableSection;
