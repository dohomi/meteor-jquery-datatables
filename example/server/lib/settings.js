var environment, settings;

environment = process.env.METEOR_ENV || "development";

settings = {
    development: {
        "public": {
            "package": {
                name: "jquery-datatables",
                description: "Sort, page, and filter millions of records. Reactively.",
                owner: "LumaPictures",
                repo: "meteor-jquery-datatables"
            }
        },
        "private": {}
    },
    staging: {
        "public": {},
        "private": {}
    },
    production: {
        "public": {},
        "private": {}
    }
};

if (!process.env.METEOR_SETTINGS) {
    console.log("No METEOR_SETTINGS passed in, using locally defined settings.");
    if (environment === "production") {
        Meteor.settings = settings.production;
    } else if (environment === "staging") {
        Meteor.settings = settings.staging;
    } else {
        Meteor.settings = settings.development;
    }
    if (Meteor.settings && Meteor.settings["public"]) {
        __meteor_runtime_config__.PUBLIC_SETTINGS = Meteor.settings["public"];
    }
    console.log("Using [ " + environment + " ] Meteor.settings");
}
