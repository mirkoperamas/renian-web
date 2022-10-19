import { useContext, useEffect, useState } from "react";
import { Connect } from "./Wallet/Connect";
// import { Session } from "../Wallet/Session";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { DefaultButton, DefaultModal } from "../";
import classes from "../containers/modals/DefaultModal/default-modal.module.scss";

export const ConnectButton = ({ pets, openModal, setOpenModal }) => {
  const { web3 } = useContext(Web3Context);
  // const { openModal, setOpenModal } = useModal();
  const [buttonColor, setButtonColor] = useState("rgb(255, 191, 0)");

  useEffect(() => {
    if (web3.account && pets) {
      pets.length > 0 ? setButtonColor("#01ad01") : setButtonColor("#f40000");
    } else setButtonColor("rgb(255, 191, 0)");
  }, [web3.account, pets]);

  return (
    <>
      <div onClick={() => setOpenModal(true)}>
        <DefaultButton
          name={
            web3.account
              ? `${web3.account.substring(0, 10)}...`
              : "Connect Wallet"
          }
          background={buttonColor}
        />
      </div>
      {openModal && !web3.account && <Connect setOpenModal={setOpenModal} />}

      {/* {open && web3.account && <Session handleClose={() => setOpen(false)} />} */}
    </>
  );
};
