// SAMPLE
this.manifest = {
    "name": "GitHub:Enterprise Notifier",
    "icon": "icon.png",
    "settings": [

        {
            "tab": "Behavior",
            "group": "General",
            "name": "enterprise_host",
            "type": "text",
            "label": "Hostname:",
            "text": "github.example.com"
        },
        {
            "tab": "Behavior",
            "group": "General",
            "name": "polling_interval_sec",
            "type": "slider",
            "label": "Check for notifications every:",
            "max": 300,
            "min": 30,
            "step": 30,
            "display": true,
            "displayModifier": function (value) {
                if (value < 60)
                {
                  message = value + " seconds";
                }
                else
                {                    
                    message = Math.floor(value / 60) + " min ";
                    if (value % 60 != 0)
                    {
                        message += (value % 60) + " sec";
                    }
                }

                return message;
            }
        },        
        {
            "tab": "Behavior",
            "group": "Repos",
            "name": "repos_to_watch",
            "type": "text",
            "label": "Repos to watch:",
            "text": "owner/repo;org/repo"
        }
    ]
};