import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "../ui/alert-dialog"
  
  
  
  export function DemandAlert({ isOpen, onClose, onConfirm, message, butonsDesable }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold text-[#12AE65]">
                        {butonsDesable ? "Success!" : "Confirm Your Demand"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600">
                        <span className="font-semibold">{message}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {butonsDesable ? (
                        <AlertDialogAction 
                            onClick={onClose} 
                            className="bg-[#12AE65] hover:bg-[#0F9A59] text-white"
                        >
                            OK
                        </AlertDialogAction>
                    ) : (
                        <>
                            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={onConfirm} 
                                className="bg-[#12AE65] hover:bg-[#0F9A59] text-white"
                            >
                                Confirm Demand
                            </AlertDialogAction>
                        </>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
  
  
  