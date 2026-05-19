type MetaItem = {
  label: string;
  value: string;
};

type Props = {
  items: MetaItem[];
  className?: string;
};

export default function MetaGrid({ items, className = "" }: Props) {
  return (
    <div className={`meta-grid ${className}`.trim()}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`meta-cell${i === items.length - 1 ? " meta-cell--last" : ""}`}
        >
          <div className="meta-cell__label">{item.label}</div>
          <div className="meta-cell__value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
