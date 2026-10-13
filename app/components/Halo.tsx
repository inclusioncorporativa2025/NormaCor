/* Círculo de marca. Ya no es un disco liso: son tres círculos perfectos
   superpuestos —uno claro grande, el tono fuerte desplazado dentro y un
   aro fino— igual que las esquinas del fondo.

   Los tres comparten centro: descolocados se leían como un error de
   montaje, no como un adorno. El aro va entre los dos rellenos, así que
   se ve sobre el claro y no sobre el blanco de fuera.

   Los radios caben enteros en el viewBox a propósito: ninguno llega a
   tocar sus bordes, y así el recorte del SVG no corta nada en recto. El
   tamaño, la posición y la opacidad los pone cada sección. */
type Props = {
  tono?: "brand" | "lilac";
  /* Sin aro quedan solo los dos rellenos. En el hero estorbaba: hay
     bastante que mirar al lado y el trazo le robaba atención. */
  aro?: boolean;
  className?: string;
} & Record<`data-${string}`, unknown>;

export default function Halo({
  tono = "brand",
  aro = true,
  className = "",
  ...resto
}: Props) {
  const c =
    tono === "lilac"
      ? { claro: "var(--lilac-100)", fuerte: "var(--lilac)", aro: "var(--lilac-400)" }
      : { claro: "var(--brand-100)", fuerte: "var(--brand)", aro: "var(--brand-500)" };

  return (
    <svg
      className={`halo ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...resto}
    >
      <circle cx="100" cy="100" r="98" fill={c.claro} />
      <circle cx="100" cy="100" r="74" fill={c.fuerte} />
      {aro && (
        <circle cx="100" cy="100" r="87" stroke={c.aro} strokeWidth="1.2" />
      )}
    </svg>
  );
}
