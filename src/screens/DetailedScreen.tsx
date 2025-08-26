import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get("window");
import MapView, { Marker } from "react-native-maps";
import { fetchLaunchpadDetails } from "../redux/Slice/LaunchpadSlice";
import { useDispatch, useSelector } from "react-redux";

type RootStackParamList = {
  Detailed: { launched: any };
};

type DetailedScreenRouteProp = RouteProp<RootStackParamList, "Detailed">;

const DetailedScreen = () => {
  const {data,loading, error} = useSelector((state:any)=>state.launchpad)
  const route = useRoute<DetailedScreenRouteProp>();
  const dispatch = useDispatch();
  const { launched } = route.params;
  // const [imageUrl, setImageUrl] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const imageUrl = data.images?.large?.[0] || null;
  const attemptsAnim = React.useRef(new Animated.Value(0)).current;
  const successAnim = React.useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;


  useEffect(()=>{
    dispatch(fetchLaunchpadDetails(launched)  as any)
  },[launched])

  useEffect(() => {
    if (data?.launch_attempts) {
      attemptsAnim.addListener(({ value }) => {
        setAttemptsCount(Math.floor(value));
      });

      Animated.timing(attemptsAnim, {
        toValue: data.launch_attempts,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }

    if (data?.launch_successes) {
      successAnim.addListener(({ value }) => {
        setSuccessCount(Math.floor(value));
      });

      Animated.timing(successAnim, {
        toValue: data.launch_successes,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      if (data?.launch_attempts > 0) {
        const rate = (data.launch_successes / data.launch_attempts) * 100;

        Animated.timing(progressAnim, {
          toValue: rate,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }
    }
    return () => {
      attemptsAnim.removeAllListeners();
      successAnim.removeAllListeners();
    };
  }, [data]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load launchpad details.</Text>
      </View>
    );
  }

  const statusColors = {
    active: "#22C55E",
    retired: "#EF4444",
    under_construction: "#F59E0B",
    unknown: "#6B7280",
  };

  const statusColor = statusColors[data.status] || statusColors.unknown;

  const successRate =
    data.launch_attempts > 0
      ? (data.launch_successes / data.launch_attempts) * 100
      : 0;

  return (
    <ScrollView style={styles.container2}>
      {/* Hero Image */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.heroImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={{flex:1}}>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 28.6139,
            longitude: 77.209,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: 28.6139, longitude: 77.209 }}
            title="New Delhi"
            description="Capital of India"
          />
        </MapView> */}
      </View>

      <View style={styles.content}>
        {/* Title + Status */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.subtitle}>{data.full_name}</Text>
          </View>
          <View
            style={[styles.statusPill, { backgroundColor: statusColor + "20" }]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {data.status.replace("_", " ").toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color="#111827" />
          <Text style={styles.locationText}>
            {data.locality}, {data.region}
          </Text>
        </View>
        {/* <Text style={styles.coordinates}>
          Lat: {data.latitude.toFixed(4)}°, Long: {data.longitude.toFixed(4)}°
        </Text> */}
        <Text style={styles.timezone}>🕒 {data.timezone}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{attemptsCount}</Text>
            <Text style={styles.statLabel}>Launch Attempts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{successCount}</Text>
            <Text style={styles.statLabel}>Launch Successes</Text>
          </View>
        </View>

        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>

          <Animated.View
            style={[
              styles.progressBox,
              {
                transform: [
                  {
                    translateX: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, width - 60], 
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.progressBoxText}>
              {successRate.toFixed(1)}%
            </Text>

          {/* Triangle notch */}
          <View style={styles.triangle} />
          </Animated.View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>SpaceX Info</Text>
          <Text style={styles.infoText}>
            {data.rockets[0] || "No rocket information"}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Details</Text>
          <Text style={styles.details} numberOfLines={showMore ? undefined : 5}>
            {data.details || "No details available for this launchpad."}
          </Text>
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <Text style={styles.readMore}>
              {showMore ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  container2: { flex: 1 },
  map: { flex: 1 },
  heroImage: {
    width: width,
    height: width * 0.6,
  },
  imagePlaceholder: {
    width: width,
    height: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
  },
  placeholderText: { color: "#6B7280", fontSize: 16 },
  content: { padding: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  location: {
    fontSize: 15,
    color: "#2563EB",
    // marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontSize: 15,
    color: "#2563EB",
    marginLeft: 5,
  },

  coordinates: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  timezone: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 20,
  },
  statusPill: {
    marginTop: -40,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111827",
  },
  infoText: {
    fontSize: 15,
    color: "#374151",
  },
  details: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  readMore: {
    color: "#2563EB",
    marginTop: 8,
    fontWeight: "500",
  },
  progressBarWrapper: {
    // marginBottom: 20,
    position: "relative",
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
  },
  progressBox: {
    position: "absolute",
    zIndex: 2,
    top: 20, 
    width: 50,
    height: 24,
    backgroundColor: "#2563EB",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  triangle: {
    position: "absolute",
    top: -6, 
    left: "50%",
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#9196a1ff", 
  },
  progressBoxText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#EF4444" },
});

export default DetailedScreen;
