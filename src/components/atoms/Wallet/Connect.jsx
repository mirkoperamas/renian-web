import classes from "./wallet.module.scss";
import Image from "next/image";
import { useContext } from "react";
import { Web3Context } from "../../../contexts/Web3/Web3Context";
import { web3Provider } from "../../../utils/web3";
import { Informative } from "../../";

export const Connect = ({ handleClose }) => {
  const { handleWeb3 } = useContext(Web3Context);

  const validate = (providerString) => {
    web3Provider(handleWeb3, providerString);
    handleClose();
  };

  return (
    <Informative handleClose={handleClose}>
      <div className={classes.connect}>
        <div>
          <h4>Conectar</h4>
          <p>
            Al conectar una billetera, acepta los Términos de servicio de
            Firulaix Labs y reconoce que ha leído y entendido el Protocolo de
            exención de responsabilidad.
          </p>
        </div>

        <div className={classes.wallet} onClick={() => validate("metamask")}>
          <p>Metamask</p>
          <div style={{ width: "3rem" }}>
            <Image
              src="/svg/metamask-logo.svg"
              layout="responsive"
              width={30}
              height={30}
              alt="image"
            />
          </div>
        </div>
      </div>
    </Informative>
  );
};
