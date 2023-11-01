import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    // Button,
  } from "@material-tailwind/react";
   
  export function ApprovalBox(props) {
    
    return (
      <Card className="mt-6 w-96 bg-gray-300 ">
        <CardBody>
          <Typography variant="h5" color="red" className="mb-2">
            Message
          </Typography>
          <Typography>
           Your Profile is not approved by our Admin.
           please wait!
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
        </CardFooter>
      </Card>
    );
  }