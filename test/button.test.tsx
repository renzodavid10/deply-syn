import { describe, expect, it } from 'vitest';
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/atoms/button/button";
import "@testing-library/jest-dom"; 


describe('Pruebas del button', () => {
    it('Se renderiza correctamente el button', () => {
        //arrange
        const textClick = "Click Me";

        //act
        render(
            <Button>
                {
                    textClick
                }
            </Button>
        );
        //assert
        /*
        !!! Ayuda a ver como un debug
        screen.debug()
        */
        expect(screen.getByText("Click Me")).toBeInTheDocument();
    })

});
