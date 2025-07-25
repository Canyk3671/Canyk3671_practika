﻿public static class StatisticsCalculator
{
    public static StatisticsResponse CalculateStats(List<Measurement> measurements)
    {
        if (measurements == null || measurements.Count == 0)
        {
            return new StatisticsResponse { Count = 0 };
        }

        return new StatisticsResponse
        {
            AverageTHD = measurements.Average(m => m.THD),
            MedianTHD = CalculateMedian(measurements, m => m.THD),
            ModeTHD = CalculateMode(measurements, m => m.THD),
            AverageTemperature = measurements.Average(m => m.Temperature),
            MedianTemperature = CalculateMedian(measurements, m => m.Temperature),
            ModeTemperature = CalculateMode(measurements, m => m.Temperature),
            Count = measurements.Count
        };
    }

    private static double? CalculateMedian(List<Measurement> measurements, Func<Measurement, double> selector)
    {
        var values = measurements.Select(selector).OrderBy(v => v).ToList();
        int count = values.Count;

        if (count % 2 == 0)
        {
            return (values[count / 2 - 1] + values[count / 2]) / 2d;
        }
        else
        {
            return values[count / 2];
        }
    }

    private static List<double> CalculateMode(List<Measurement> measurements, Func<Measurement, double> selector)
    {
        var groups = measurements
            .Select(selector)
            .GroupBy(v => v)
            .OrderByDescending(g => g.Count())
            .ToList();

        if (!groups.Any())
            return new List<double>();

        int maxCount = groups.First().Count();

        return groups
            .Where(g => g.Count() == maxCount)
            .Select(g => g.Key)
            .ToList();
    }
}