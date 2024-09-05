import { Win } from "@/types/win.enum"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material"

interface BingoWinAlertProps {
  handleClose: () => void
  win: Win
}

const BingoWinAlert = ({
  open,
  handleClose,
  win,
}: DialogProps & BingoWinAlertProps) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle id="alert-dialog-title">Winner!</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You got a bingo {win}!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} autoFocus>
        {win === Win.Line ? `Go for a ${Win.Blackout}!` : "Close"}
      </Button>
    </DialogActions>
  </Dialog>
)

export default BingoWinAlert
