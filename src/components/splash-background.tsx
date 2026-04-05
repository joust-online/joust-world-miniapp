"use client";

export default function SplashBackground() {
  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full overflow-hidden">
      <img
        src="/images/background_full__joust_graded.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
