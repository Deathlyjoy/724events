import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });

  // ----------------- Tests supplémentaires des liens de la navbar ----------------- //
  it("When click on Nos services button", () => {
    render(<Menu />);
    
    expect(screen.getByText("Nos services")).toHaveAttribute(
      "href",
      "#nos-services"
    );
  });

  it("When click on Nos réalisations button", () => {
    render(<Menu />);
    
    expect(screen.getByText("Nos réalisations")).toHaveAttribute(
      "href",
      "#nos-realisations"
    );
  });

  it("When click on Notre équipe button", () => {
    render(<Menu />);
    
    expect(screen.getByText("Notre équipe")).toHaveAttribute(
      "href",
      "#notre-equipe"
    );
  });


  
});
