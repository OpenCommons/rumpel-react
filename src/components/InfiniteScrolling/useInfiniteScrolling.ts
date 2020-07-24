import { useEffect, useState } from "react";
import { HatClientService } from "../../services/HatClientService";
import { DayGroupedSheFeed, SheFeed } from "../../features/feed/she-feed.interface";
import { groupBy } from 'lodash';
import { startOfDay, subDays, format } from "date-fns";

export default function useInfiniteScrolling(refreshDate: Date) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState<DayGroupedSheFeed[]>([]);
  const [items, setItems] = useState<SheFeed[]>([]);
  const [displayItems, setDisplayItems] = useState<SheFeed[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [since, setSince] = useState(Math.round(subDays(Date.now(), 20).getTime() / 1000));
  const [until, setUntil] = useState(Math.round(startOfDay(Date.now()).getTime() / 1000));
  const [step, setStep] = useState(1);
  const [repeats, setRepeats] = useState(0);
  const [notEnoughData, setNotEnoughData] = useState(true);

  useEffect(() => {
    setFeed(groupSheFeedByDay(items));
  }, [items]);

  const groupSheFeedByDay = (feedItems: SheFeed[]): { day: string; data: SheFeed[] }[] => {
    const groupedByDay = groupBy(feedItems, item => format(item.date.unix * 1000, 'EEE dd MMM yyyy') as string);

    return Object.keys(groupedByDay)
      .map((day: string) => {
        return { day: day, data: groupedByDay[day] };
      });
  };

  useEffect(() => {
    setItems([]);
    setSince(Math.round(subDays(Date.now(), 20).getTime() / 1000));
    setUntil(Math.round(startOfDay(Date.now()).getTime() / 1000));
  }, [refreshDate]);

  useEffect(() => {

    const fetchFeed = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await HatClientService.getInstance().getSheRecords("", since, until);

        if (res?.parsedBody && res.parsedBody.length > 0) {
          setItems(prevItems => {
            // @ts-ignore
            return [...prevItems, ...res.parsedBody];
          });
          setLoading(false);
          setHasMore(true);
        }
        const newSince = Math.round(subDays(until * 1000, 30 * step).getTime() / 1000);
        setUntil(since - 1);
        setSince(newSince);

        setNotEnoughData(false);

        if(items.length > 5) {
          setRepeats(0);
          setLoading(false);
          setHasMore(true);
        } else {
          setRepeats(repeats => repeats + 1);
          setStep(2);
        }

        setDisplayItems(items.slice(0, 50));
      } catch (e) {
        // TODO Error Handling
        setError(true);
        setLoading(false);
        setNotEnoughData(false);
        console.log(e);
      }
    };

    // if (repeats < 2 && notEnoughData) {
    //   fetchFeed();
    // }

    fetchFeed();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshDate, notEnoughData, repeats]);

  return { loading, error, feed, items, displayItems, hasMore, setNotEnoughData };
}
