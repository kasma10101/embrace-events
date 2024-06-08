import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function ButtonLoading() {
  return (
    <>
      <Button style={{width:"100%",fontWeight:"700"}} variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </>
  );
}

export default ButtonLoading;