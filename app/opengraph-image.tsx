import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

export const alt = "DC Refrigeración, servicio técnico de aire acondicionado";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#e7f4fb",
          color: "#102033",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#0e7490" }}>{site.shortName}</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          Servicio técnico de aire y refrigeración
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>
          {site.rating.toString().replace(".", ",")} en Google · {site.reviewCount} opiniones
        </div>
      </div>
    ),
    size,
  );
}
