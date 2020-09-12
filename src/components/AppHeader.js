import React from 'react';
import Typography from "@material-ui/core/Typography";

// Bai tap 3: hien thi dong ho he thong (build <Clock>)
//           - Hien thi <Button> "GO TO TODAY" de nhay ngay cua calendar den ngay hien tai
function AppHeader() {
    return (
        <Typography variant="h2">
            Welcome to my TODOS list
        </Typography>
    );
}

export default AppHeader;