import React from "react";

function Intercom(user){
    console.log(user?.firstName,"intercom name")
    if (typeof window !== 'undefined'){
        if (window.Intercom) {
          window.Intercom('boot', {
            api_base: 'https://api-iam.intercom.io',
            app_id: 'm7xe1x6e',
            name: user?.firstName,
            email: user?.email,
            created_at: user?.createdAt,
          });
        }
    }
}
    export default Intercom;