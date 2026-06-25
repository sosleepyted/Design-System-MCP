import { Icon, ICON_PATHS, type IconName } from "@ucm/ui";

export function IconGallery() {
  const names = Object.keys(ICON_PATHS) as IconName[];
  return (
    <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-5">
      {names.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-[12px] border border-[#001E2B]/10 bg-white p-4 text-center text-[#001E2B]"
        >
          <Icon name={name} size={24} />
          <span className="break-all font-mono text-[11px] text-[#001E2B]/55">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function IconSizes() {
  return (
    <div className="flex items-end gap-4 text-[#001E2B]">
      <Icon name="check_circle" size={16} />
      <Icon name="check_circle" size={20} />
      <Icon name="check_circle" size={28} />
      <Icon name="check_circle" size={40} />
    </div>
  );
}

export function IconColor() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="error" size={28} className="text-[#a32d2d]" />
      <Icon name="check_circle" size={28} className="text-[#0f5e2a]" />
      <Icon name="info" size={28} className="text-[#001E2B]/55" />
      <Icon name="lock" size={28} className="text-[#001E2B]" />
    </div>
  );
}
