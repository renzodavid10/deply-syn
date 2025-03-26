import { Transferencia } from "../../interface.ts/transferencia";
import { sleep } from "../../utils/sleep";


export const getTranferencia = async () => {
    try {
        const response = await fetch("http://localhost:8090/api/transeferencia/all");
        const data: Transferencia[] = await response.json();

        //console.log(data);
        await sleep(1500);
        return {
            ok: true,
            data,
        };
    } catch (error) {
        return {
            ok: false,
            message: (error as Error).message,
        };
    }
}
export const postTranferencia = async (transeferencia: Omit<Transferencia, "id">) => {
    try {
        await fetch("http://localhost:8090/api/transeferencia/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transeferencia)
            }
        );
        console.log(transeferencia);
        await sleep(1500);
        return {
            ok: true

        };
    } catch (error) {
        return {
            ok: false,
            message: (error as Error).message,
        };
    }
}

export const deleteTransferencia = async (id: number) => {
    try {
        const response = await fetch(
            "http://localhost:8090/api/transeferencia/delete/" + id,
            {
                method: "DELETE",
            }
        );

        return {
            ok: true

        };
    } catch (error) {
        return {
            ok: false,
            message: (error as Error).message,
        };
    }
};

export const updateTransferencia = async (
    tranferencia: Omit<Partial<Transferencia>, "id">,
    id: number
  ) => {
    try {
      await fetch(
        "http://localhost:8090/api/transeferencia/update/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
        },
          body: JSON.stringify(tranferencia),
        }
      );
      //const data: Todo = await response.json();
      console.log(tranferencia);
      return {
        ok: true,
        //data,
      };
    } catch (error) {
      return {
        ok: false,
        message: (error as Error).message,
      };
    }
  };
  