import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

const PAGE_SIZE = 18;

type base ={
  detailed: null;
}

export default function ListScreen() {
  const [launches, setLaunches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const navigation = useNavigation<NavigationProp<base>>()

  const loadLaunches = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://api.spacexdata.com/v5/launches");
      const data = await res.json();
      console.log("the  first data is @@@@@@@~~~~!@!!@!@@!",data[0]?.links?.patch?.small)
      const sorted = data.sort(
        (a, b) => new Date(b.date_utc) - new Date(a.date_utc)
      );
      setLaunches(sorted);
      if (query.trim()) {
      const result = sorted.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result);
    } else {
      setFiltered(sorted);
    }

      setVisibleCount(PAGE_SIZE);
    } catch (err) {
      setError("Failed to load launches");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLaunches();
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    if (!text) {
      setFiltered(launches);
    } else {
      const result = launches.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(result);
    }
    setVisibleCount(PAGE_SIZE);
  };

  const onRefresh = async () => {
    // setFiltered(launches)
    setRefreshing(true);
    await loadLaunches();
    setRefreshing(false);
  };

  const loadMore = () => {
    if (visibleCount < filtered.length) {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString();
  };

  const getStatus = (l) => {
    if (l.upcoming) return { label: "Upcoming", color: "#0A84FF" };
    if (l.success) return { label: "Success", color: "#34C759" };
    return { label: "Failure", color: "#FF3B30" };
  };

  type HandleLaunchProp = {
    item: null,
  }

 const handleClick = (item) => {
  console.log("launch padd id is!!!",item?.launchpad)
   navigation.navigate("detailed", {launched: item?.launchpad});
  // console.log("thr navigation pressed is here")
};

  const renderItem = ({ item }) => {
    const status = getStatus(item);
    const img = item.links?.patch?.small;
  // Skip rendering if no image
    if (!img) return null;
    return (
     <TouchableOpacity style={styles.card} onPress={() => handleClick(item)}>
        <Image source={{ uri: img }} style={styles.image} />
        <View style={styles.content}>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={[styles.statusPill, { backgroundColor: status.color + "20" }]}>
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
          </View>
          <Text style={styles.subtitle}>{formatDate(item.date_utc)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Pressable onPress={loadLaunches} style={styles.retryBtn}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Search bar */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          style={{ marginRight: 8, opacity: 0.6 }}
        />
        <TextInput
          placeholder="Search missions"
          value={query}
          onChangeText={handleSearch}
          style={{ flex: 1 }}
        />
        {query ? (
          <Pressable onPress={() => handleSearch("")}>
            <Ionicons name="close-circle" size={18} />
          </Pressable>
        ) : null}
      </View>

      {/* List */}
      <FlatList
        data={filtered.slice(0, visibleCount)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          visibleCount < filtered.length ? (
            <ActivityIndicator style={{ margin: 16 }} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F7FB" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 34, 
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical:8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
    width:"70%",
    flexWrap:"wrap",
  },
  subtitle: {
    fontSize: 14,
    color: "#566070",
    marginBottom: 6,
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryBtn: {
    marginTop: 12,
    backgroundColor: "#0A84FF",
    padding: 10,
    borderRadius: 8,
  },
  retryText: { color: "#fff" },
});
