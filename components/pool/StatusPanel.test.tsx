import { fireEvent, render, screen } from "@testing-library/react";
import { PoolEngine, tableConfig } from "./engine";
import StatusPanel from "./StatusPanel";
import { LIGHT } from "./theme";

const setup = () => {
  const engine = new PoolEngine(tableConfig(false));
  const onPlayAgain = jest.fn();
  const onEndGame = jest.fn();
  const view = () =>
    render(
      <StatusPanel
        engine={engine}
        pal={LIGHT}
        horizontal
        maxWidth={1028}
        onPlayAgain={onPlayAgain}
        onEndGame={onEndGame}
      />,
    );
  return { engine, onPlayAgain, onEndGame, view };
};

describe("StatusPanel", () => {
  it("announces the current message as a status", () => {
    const { engine, view } = setup();
    view();
    expect(screen.getByRole("status")).toHaveTextContent(engine.message);
  });

  it("only offers Play again once there is a winner", () => {
    const { engine, onPlayAgain, view } = setup();
    const { rerender } = view();
    expect(screen.queryByRole("button", { name: "Play again" })).toBeNull();

    engine.winner = "you";
    rerender(
      <StatusPanel
        engine={engine}
        pal={LIGHT}
        horizontal
        maxWidth={1028}
        onPlayAgain={onPlayAgain}
        onEndGame={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Play again" }));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });

  it("always offers End game and calls back when it is clicked", () => {
    const { onEndGame, view } = setup();
    view();
    fireEvent.click(screen.getByRole("button", { name: "End game" }));
    expect(onEndGame).toHaveBeenCalledTimes(1);
  });
});
