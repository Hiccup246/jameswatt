import type { PoolEngine, Player } from "./engine";
import { ballBackground, type Palette } from "./theme";

interface Props {
  engine: PoolEngine;
  pal: Palette;
  /** True for the landscape table; decides the stripe direction on chips. */
  horizontal: boolean;
  /** Widest the panel may grow, normally the table width. */
  maxWidth: number;
  onPlayAgain: () => void;
  /** Collapses the table back to the coin. */
  onEndGame: () => void;
}

interface PlayerProps {
  engine: PoolEngine;
  who: Player;
  pal: Palette;
  horizontal: boolean;
}

/** One player's name, group label and chips for the balls they have left. */
function PlayerCard({ engine, who, pal, horizontal }: PlayerProps) {
  const isYou = who === "you";
  const group = engine.groups[who];
  const active = engine.turn === who && !engine.winner;
  const remaining = group ? engine.left(group) : [];

  const turnDot = (
    <span
      aria-hidden
      className="size-2 rounded-full"
      style={{ background: pal.ink, opacity: active ? 1 : 0 }}
    />
  );
  const groupLabel = (
    <span className="font-normal opacity-60">{group ?? ""}</span>
  );

  return (
    <div
      className={`flex flex-col gap-1.5 ${isYou ? "items-end" : "items-start"}`}
    >
      <span
        className="flex items-center gap-1.5"
        style={{ fontWeight: engine.turn === who ? 700 : 400 }}
      >
        {isYou ? (
          <>
            {groupLabel}
            You
            {turnDot}
          </>
        ) : (
          <>
            {turnDot}
            James
            {groupLabel}
          </>
        )}
      </span>
      {/* The chips are decorative; the message announces what is left. */}
      <div
        aria-hidden
        className={`flex flex-wrap gap-1 ${isYou ? "justify-end" : ""}`}
      >
        {remaining.map((b) => (
          <span
            key={b.n}
            className="size-3.5 rounded-full"
            style={{
              background: ballBackground(b.n, horizontal),
              boxShadow: "inset 0 -1px 2px rgba(0,0,0,.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Status message, scoreboard and "Play again" button shown under the table.
 * The message is a polite live region so screen readers hear each turn change.
 */
export default function StatusPanel({
  engine,
  pal,
  horizontal,
  maxWidth,
  onPlayAgain,
  onEndGame,
}: Props) {
  return (
    <div
      className="flex w-full flex-col gap-3 text-[13px] tracking-[.04em]"
      style={{ maxWidth, color: pal.ink }}
    >
      <div className="flex min-h-[34px] items-center justify-center gap-4 text-center text-pretty">
        <span role="status" className="text-sm font-semibold">
          {engine.message}
        </span>
        {engine.winner && (
          <button
            type="button"
            onClick={onPlayAgain}
            className="cursor-pointer rounded-full border-none px-4 py-2 font-semibold tracking-[.04em] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: pal.btnBg,
              color: pal.btnInk,
              outlineColor: pal.ink,
            }}
          >
            Play again
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <PlayerCard
          engine={engine}
          who="james"
          pal={pal}
          horizontal={horizontal}
        />
        <button
          type="button"
          onClick={onEndGame}
          className="flex-none cursor-pointer self-center rounded-full border-[1.5px] bg-transparent px-3.5 py-1.5 text-xs font-semibold tracking-[.04em] opacity-70 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            color: pal.ink,
            borderColor: pal.ink,
            outlineColor: pal.ink,
          }}
        >
          End game
        </button>
        <PlayerCard
          engine={engine}
          who="you"
          pal={pal}
          horizontal={horizontal}
        />
      </div>
    </div>
  );
}
