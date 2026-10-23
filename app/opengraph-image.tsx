import { ImageResponse } from "next/og";
export const alt = "Distilled Industries — operator field guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#f4efe6", color: "#121212", border: "14px solid #121212", fontFamily: "Arial" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4 }}><span>DISTILLED INDUSTRIES</span><span>OPERATOR FIELD GUIDE / 01—116</span></div><div style={{ display: "flex", flexDirection: "column", fontWeight: 900, fontSize: 100, lineHeight: 0.88, letterSpacing: -4 }}><span>EVERY INDUSTRY</span><span style={{ color: "#ff5b2d" }}>HAS A CASH CYCLE.</span></div><div style={{ fontSize: 26 }}>Operator context · Sector intelligence · Capital decisions</div></div>, size);
}
