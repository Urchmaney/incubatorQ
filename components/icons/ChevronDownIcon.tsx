export const ChevronDownIcon = ({fill, size, height, width, ...props}: { fill: string, size: number, height?: number, width?: number }) => {
  return (
    <svg
      fill={ fill || "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 16a1 1 0 0 1-.707-.293L5.636 10.05A1 1 0 0 1 7.05 8.636l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657A1 1 0 0 1 12 16z"/>
    </svg>
  );
};