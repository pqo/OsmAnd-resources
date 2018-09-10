// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: distance(Dist, metrin/metria)
var metricConst;
var tts;
var dictionary = {};
//// STRINGS
////////////////////////////////////////////////////////////////
// ROUTE CALCULATED
function populateDictionary(tts) {
	dictionary["route_is"] = tts ? "Matkan pituus on " : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Reitin uudelleenlaskenta" : "route_calculate.ogg";
	dictionary["distance"] = tts ? ", etäisyys " : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Valmistaudu " : "prepare.ogg";
	dictionary["after"] = tts ? "" : "after.ogg";
	dictionary["in"] = tts ? " " : "in.ogg";
	dictionary["get"] = tts ? "päästä  " : "get.ogg";
	dictionary["now"] = tts ? "nyt,  " : "now.ogg";

	   // Vasempaan/vasemmalle and oikeaan/oikealle are interchangeable in normal speech but the Finnish military standard in directions is VASEMPAAN and OIKEALLE. We should also do this as it makes it much easier to distinguish in noise.
	dictionary["left"] = tts ? "käänny vasempaan" : "left.ogg";
	dictionary["left_sh"] = tts ? "käänny jyrkästi vasempaan" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "käänny loivasti vasempaan" : "left_sl.ogg";
	dictionary["right"] = tts ? "käänny oikealle" : "right.ogg";
	dictionary["right_sh"] = tts ? "käänny jyrkästi oikealle" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "käänny loivasti oikealle" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "pidä vasen" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "pidä oikea" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "pidä vasen" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "pidä oikea" : "right_bear.ogg";   // in English the same as right_keep, may be different in other languages

	// U-TURNS
	//dictionary["prepare_make_uturn"] = tts ? "Valmistaudu kääntymään takaisin" : "prepare_make_uturn.ogg";
	dictionary["make_uturn1"] = tts ? "Käänny takaisin" : "make_uturn1.ogg";
	dictionary["make_uturn2"] = tts ? "Nyt, käänny takaisin" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "Käänny takaisin, kun mahdollista" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Valmistaudu ajamaan liikenneympyrään" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "Aja liikenneympyrään" : "roundabout.ogg";
	dictionary["then"] = tts ? "sitten " : "then.ogg";
	dictionary["and"] = tts ? " ja " : "and.ogg";
	dictionary["take"] = tts ? "päästä ja ota " : "take.ogg";
	dictionary["exit"] = tts ? "liittymä " : "exit.ogg";
	dictionary["take2"] = tts ? "Nyt, ota " : "take2.ogg";

	dictionary["1st"] = tts ? "ensimmäinen " : "1st.ogg";
	dictionary["2nd"] = tts ? "toinen " : "2nd.ogg";
	dictionary["3rd"] = tts ? "kolmas " : "3rd.ogg";
	dictionary["4th"] = tts ? "neljäs " : "4th.ogg";
	dictionary["5th"] = tts ? "viides " : "5th.ogg";
	dictionary["6th"] = tts ? "kuudes " : "6th.ogg";
	dictionary["7th"] = tts ? "seitsemäs " : "7th.ogg";
	dictionary["8th"] = tts ? "kahdeksas " : "8th.ogg";
	dictionary["9th"] = tts ? "yhdeksäs " : "9th.ogg";
	dictionary["10th"] = tts ? "kymmenes " : "10th.ogg";
	dictionary["11th"] = tts ? "yhdestoista " : "11th.ogg";
	dictionary["12th"] = tts ? "kahdestoista " : "12th.ogg";
	dictionary["13th"] = tts ? "kolmastoista " : "13th.ogg";
	dictionary["14th"] = tts ? "neljästoista " : "14th.ogg";
	dictionary["15th"] = tts ? "viidestoista " : "15th.ogg";
	dictionary["16th"] = tts ? "kuudestoista " : "16th.ogg";
	dictionary["17th"] = tts ? "seitsemästoista " : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Jatka suoraan" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Seuraa tietä " : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "ja olet perillä " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "olet perillä, " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "ja saavut välietappiin " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "olet välietapissa " : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "ja ohitat reittipisteen " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "ohitat reittipisteen " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "ja ohitat suosikin " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "ohitat suosikin " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "ja ohitat POIn " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "ohitat POIn " : "reached_poi.ogg";

	// ATTENTION
	dictionary["exceed_limit"] = tts ? "nopeusrajoitus on " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "huomio, " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "nopeuskamera" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "rajavalvonta" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "tasoristeys" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "nopeushidaste" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "tietulli" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "Stop-merkki" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "suojatie" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunneli" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "GPS-signaali katosi" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "GPS-signaali palautui" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "olet poikennut reitiltä " : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "olet taas reitillä" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	// In Finnish, street names would have to be inflected:
	// Turn onto Pihakatu -> Käänny PihakaDULLE 
	// Along Pihakatu -> PihakatuA pitkin
	// and there are no prepositions, so just saying the street name is the best that can be done easily
	dictionary["onto"] = tts ? " " : "onto.ogg";
	dictionary["on"] = tts ? " " : "on.ogg";
	dictionary["to"] = tts ? " " : "to.ogg";
	dictionary["toward"] = tts ? "kohti" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters_metrin"] = tts ? "metrin" : "meters_metrin.ogg";
	dictionary["meters_metri"] = tts ? "metriä" : "meters_metri.ogg";
	dictionary["around_1_kilometer_metrin"] = tts ? "noin 1 kilometrin" : "around_1_kilometer_metrin.ogg";
	dictionary["around_1_kilometer_metri"] = tts ? "noin 1 kilometri" : "around_1_kilometer_metri.ogg";
	dictionary["around"] = tts ? "noin" : "around.ogg";  // Note: do not put space after word "noin" because for some reason the SVOX Finnish Satu Voice announces the number wrong if there is a space
	dictionary["kilometers_metrin"] = tts ? "kilometrin" : "kilometers_metrin.ogg";
	dictionary["kilometers_metri"] = tts ? "kilometriä" : "kilometers_metri.ogg";

	dictionary["feet_metrin"] = tts ? "jalkaa" : "feet_metrin.ogg";
	dictionary["feet_metri"] = tts ? "jalkaa" : "feet_metri.ogg";
	dictionary["1_tenth_of_a_mile_metrin"] = tts ? "mailin kymmenyksen" : "1_tenth_of_a_mile_metrin.ogg";
	dictionary["1_tenth_of_a_mile_metri"] = tts ? "mailin kymmenys" : "1_tenth_of_a_mile_metri.ogg";
	dictionary["tenths_of_a_mile_metrin"] = tts ? "mailin kymmenyksen" : "tenths_of_a_mile_metrin.ogg";
	dictionary["tenths_of_a_mile_metri"] = tts ? "mailin kymmenystä" : "tenths_of_a_mile_metri.ogg";
	dictionary["around_1_mile_metrin"] = tts ? "noin yhden mailin" : "around_1_mile_metrin.ogg";
	dictionary["around_1_mile_metri"] = tts ? "noin yksi maili" : "around_1_mile_metri.ogg";
	dictionary["miles_metrin"] = tts ? "mailin" : "miles_metrin.ogg";
	dictionary["miles_metri"] = tts ? "maili" : "miles_metri.ogg";

	dictionary["yards_metrin"] = tts ? "jaardin" : "yards_metrin.ogg";
	dictionary["yards_metri"] = tts ? "jaardi" : "yards_metri.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? ", aikaa " : "time.ogg";
	dictionary["1_hour"] = tts ? "yksi tunti " : "1_hour.ogg";
	dictionary["hours"] = tts ? "tuntia " : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "alle minuutti" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "minuutti" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minuuttia" : "minutes.ogg";
}

//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}


function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist, "metri") + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : "");
}

// metri = metria
function distance(dist, declension) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return (tts ? Math.round((dist/10.0)*10).toString() : ogg_dist((dist/10.0)*10)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1000) {
				return (tts ? Math.round((2*dist/100.0)*50).toString() : ogg_dist((2*dist/100.0)*50)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer_" + declension];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + dictionary["kilometers_" + declension];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + dictionary["kilometers_" + declension];
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? Math.round((2*dist/100.0/0.3048)*50).toString() : ogg_dist((2*dist/100.0/0.3048)*5)) + " " + dictionary["feet_" + declension];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile_" + declension];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(dist/161.0)) + " " + dictionary["tenths_of_a_mile_" + declension];
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return (tts ? Math.round((dist/10.0)*10).toString() : ogg_dist((dist/10.0)*10)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1300) {
				return (tts ? Math.round((2*dist/100.0)*50).toString() : ogg_dist((2*dist/100.0)*50)) + " " + dictionary["meters_" + declension];
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(dist/0.9144)) + " " + dictionary["yards_" + declension];
			} else if (dist < 100) {
				return (tts ? Math.round((dist/10.0/0.9144)*10).toString() : ogg_dist((dist/10.0/0.9144)*10)) + " " + dictionary["yards_" + declension];
			} else if (dist < 1300) {
				return (tts ? Math.round((2*dist/100.0/0.9144)*50).toString() : ogg_dist((2*dist/10.0/0.9144)*10)) + " " + dictionary["yards_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles_" + declension];
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + " " + dictionary["1_minute"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60).toString() + " " + dictionary["minutes"];
	} else if (!tts && seconds < 300) {
		return minutes.toString() + ".ogg " + dictionary["minutes"];
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + (oggMinutes % 60).toString() + ".ogg " + dictionary["minutes"];
	} else if (!tts) {
		return hours(oggMinutes);
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else {
		var hours = minutes / 60;
        return Math.floor(hours).toString() + (!tts ? ".ogg " : " ") + dictionary["hours"]; 
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist, "metri") + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : "");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist, "metri") + " " + follow_street(streetName);
	}
	
// go_ahead(Dist, Street) -- ["follow", D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).
// follow_street("", []).
// follow_street(voice(["","",""],_), []).
// follow_street(voice(["", "", D], _), ["to", D]) :- tts.
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["to", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return dictionary["now"] + " " + getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist, "metrin") + " " + dictionary["get"] + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function  getTurnType(turnType) {
	// turn("left", ).
// turn("left_sh", ["left_sh"]).
// turn("left_sl", ["left_sl"]).
// turn("right", ["right"]).
// turn("right_sh", ["right_sh"]).
// turn("right_sl", ["right_sl"]).
// turn("left_keep", ["left_keep"]).
// turn("right_keep", ["right_keep"]).
// // Note: turn("left_keep"/"right_keep",[]) is a turn type aiding lane selection, while bear_left()/bear_right() is triggered as brief "turn-after-next" preparation sounding always after a "..., then...". In some languages turn(l/r_keep) may not differ from bear_l/r:
	switch (turnType) {
		case "left":
			return dictionary["left"];
			break;
		case "left_sh":
			return dictionary["left_sh"];
			break;
		case "left_sl":
			return dictionary["left_sl"];
			break;
		case "right":
			return dictionary["right"];
			break;
		case "right_sh":
			return dictionary["right_sh"];
			break;
		case "right_sl":
			return dictionary["right_sl"];
			break;
		case "left_keep":
			return dictionary["left_keep"];
			break;
		case "right_keep":
			return dictionary["right_keep"];
			break;
	}
}

function then() {
	// then -- ["then"].
	return dictionary["then"];
}

function roundabout(dist, angle, exit, streetName) {
	// roundabout(Dist, _Angle, Exit, Street) -- ["in", D, "roundabout", "and", "take", E, "exit" | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
// roundabout(_Angle, Exit, Street) -- ["take", E, "exit" | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["take2"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["roundabout"] + " " + distance(dist, "metrin") + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	// turn_street("", []).
// turn_street(voice(["","",""],_), []).
// turn_street(voice(["", "", D], _), ["toward", D]) :- tts.
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["onto", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	}
	return "";
}

function assemble_street_name(streetName) {
// assemble_street_name(voice([Ref, Name, ""], _), Concat) :- atom_concat(Ref, " ", C1), atom_concat(C1, Name, Concat).
// assemble_street_name(voice(["", Name, Dest], _), [C1, "toward", Dest]) :- atom_concat(Name, " ", C1).
// assemble_street_name(voice([Ref, _, Dest], _), [C1, "toward", Dest]) :- atom_concat(Ref, " ", C1).
	if (streetName["toDest"] === "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] === "") {
		return streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	}
}

function nth(exit) {
	switch (exit) {
		case (1):
			return dictionary["1st"];
		case (2):
			return dictionary["2nd"];
		case (3):
			return dictionary["3rd"];
		case (4):
			return dictionary["4th"];
		case (5):
			return dictionary["5th"];
		case (6):
			return dictionary["6th"];
		case (7):
			return dictionary["7th"];
		case (8):
			return dictionary["8th"];
		case (9):
			return dictionary["9th"];
		case (10):
			return dictionary["10th"];
		case (11):
			return dictionary["11th"];
		case (12):
			return dictionary["12th"];
		case (13):
			return dictionary["13th"];
		case (14):
			return dictionary["14th"];
		case (15):
			return dictionary["15th"];
		case (16):
			return dictionary["16th"];
		case (17):
			return dictionary["17th"];
	}
}

function make_ut(dist, streetName) {
	// make_ut(Dist, Street) --  ["in", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ["make_uturn" | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return dictionary["make_uturn1"] + " " + distance(dist, "metrin") + " " + dictionary["get"] + " " + turn_street(streetName);
	}
}

// bear_left(_Street) -- ["left_bear"].
// bear_right(_Street) -- ["right_bear"].
function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	// prepare_make_ut(Dist, Street) -- ["after", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
	return dictionary["make_uturn1"] + " " + distance(dist, "metrin") + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist, "metrin") + " " + dictionary["get"] + " " + turn_street(streetName);
}


function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["after"] + " " + distance(dist, "metrin") + " " + dictionary["get"] + " " + dictionary["prepare_roundabout"]; 
}

// reached_destination(D) -- ["reached_destination"|Ds] :- name(D, Ds).

// reached_intermediate(D) -- ["reached_intermediate"|Ds] :- name(D, Ds).

// and_arrive_waypoint(D) -- ["and_arrive_waypoint"|Ds] :- name(D, Ds).
// reached_waypoint(D) -- ["reached_waypoint"|Ds] :- name(D, Ds).
// and_arrive_favorite(D) -- ["and_arrive_favorite"|Ds] :- name(D, Ds).
// reached_favorite(D) -- ["reached_favorite"|Ds] :- name(D, Ds).
// and_arrive_poi(D) -- ["and_arrive_poi"|Ds] :- name(D, Ds).
// reached_poi(D) -- ["reached_poi"|Ds] :- name(D, Ds).

// location_lost -- ["location_lost"].
// location_recovered -- ["location_recovered"].
// off_route(Dist) -- ["off_route", D] :- distance(Dist) -- D.
// back_on_route -- ["back_on_route"].
function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
	// and_arrive_intermediate(D) -- ["and_arrive_intermediate"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_intermediate"] + " " + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest;
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest;
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist, "metrin");
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	// make_ut_wp -- ["make_uturn_wp"].
	return dictionary["make_uturn_wp"];
}


// name(D, [D]) :- tts.
// name(_D, []) :- not(tts).

// // TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + " " + maxSpeed.toString();
}

function attention(type) {
	return dictionary["attention"] + " " + getAttentionString(type);
}

function getAttentionString(type) {
	switch (type) {
		case "SPEED_CAMERA":
			return dictionary["speed_camera"];
			break;
		case "SPEED_LIMIT":
			return "";
			break
		case "BORDER_CONTROL":
			return dictionary["border_control"];
			break;
		case "RAILWAY":
			return dictionary["railroad_crossing"];
			break;
		case "TRAFFIC_CALMING":
			return dictionary["traffic_calming"];
			break;
		case "TOLL_BOOTH":
			return dictionary["toll_booth"];
			break;
		case "STOP":
			return dictionary["stop"];
			break;
		case "PEDESTRIAN":
			return dictionary["pedestrian_crosswalk"];
			break;
		case "MAXIMUM":
			return "";
			break;
		case "TUNNEL":
			return dictionary["tunnel"];
			break;
		default:
			return "";
			break;
	}
}

function ogg_dist(distance) {
	if (distance == 0) {
		return "";
	} else if (distance < 20) {
		return Math.floor(distance).toString() + ".ogg ";
	} else if (distance < 1000 && (distance % 50) == 0) {
		return distance.toString() + ".ogg ";
	} else if (distance < 30) {
		return "20.ogg " + ogg_dist(distance - 20);
	} else if (distance < 40) {
		return "30.ogg " + ogg_dist(distance - 30);
	} else if (distance < 50) {
		return "40.ogg " + ogg_dist(distance - 40);
	} else if (distance < 60) {
		return "50.ogg " + ogg_dist(distance - 50);
	} else if (distance < 70) {
		return "60.ogg " + ogg_dist(distance - 60);
	} else if (distance < 80) {
		return "70.ogg "+ ogg_dist(distance - 70);
	} else if (distance < 90) {
		return "80.ogg " + ogg_dist(distance - 80);
	} else if (distance < 100) {
		return "90.ogg " + ogg_dist(distance - 90);
	} else if (distance < 200) {
		return "100.ogg " + ogg_dist(distance - 100);
	} else if (distance < 300) {
		return "200.ogg " + ogg_dist(distance - 200);
	} else if (distance < 400) {
		return "300.ogg "+ ogg_dist(distance - 300);
	} else if (distance < 500) {
		return "400.ogg " + ogg_dist(distance - 400);
	} else if (distance < 600) {
		return "500.ogg " + ogg_dist(distance - 500);
	} else if (distance < 700) {
		return "600.ogg " + ogg_dist(distance - 600);
	} else if (distance < 800) {
		return "700.ogg " + ogg_dist(distance - 700);
	} else if (distance < 900) {
		return "800.ogg " + ogg_dist(distance - 800);
	} else if (distance < 1000) {
		return "900.ogg " + ogg_dist(distance - 900);
	} else {
		return ogg_dist(distance/1000) + "1000.ogg " + ogg_dist(distance % 1000);
	}
}