import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeData } from "src/helper/storageHelper";
import { useOtp } from "src/hooks/useOtp";
import { useSnack } from "src/hooks/useSnack";


export default function OtpCountdown() {
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const { removeOtp } = useOtp()
  const { showSnackBar } = useSnack()
  const onOtpRemove = async () => {
    try {
      const resp = await removeOtp();
      if (resp) {
        navigate("/", { replace: true });
        showSnackBar(resp.message, "error");
        removeData('user')
      }
    } catch (err) {
      showSnackBar(err || "Error removing otp", "error");
    }
  };
  useEffect(() => {
    if (counter === 0) {
      onOtpRemove();
      return;
    }
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <>
      {counter === 0 ? (
        <Typography >{'Otp expired'}</Typography>
      ) : (
        <Typography >
          Otp will expire in: {counter} 
        </Typography>
      )}
    </>
  );
}
