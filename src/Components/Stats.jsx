import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../Style/Stats.css';

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValues, setAnimatedValues] = useState({
        accuracy: 0,
        monitoring24: 0,
        monitoring7: 0,
        pets: 0,
        alerts: 0
    });
    const statsRef = useRef(null);

    const stats = useMemo(() => [
        {
            key: 'accuracy',
            type: 'single',
            value: 98,
            suffix: '%',
            label: 'Detection Accuracy'
        },
        {
            key: 'monitoring',
            type: 'dual',
            value1: 24,
            value2: 7,
            separator: '/',
            label: 'Monitoring'
        },
        {
            key: 'pets',
            type: 'single',
            value: 2.5,
            suffix: 'K+',
            label: 'Pets Protected'
        },
        {
            key: 'alerts',
            type: 'single',
            value: 15,
            suffix: 'min',
            label: 'Early Alerts'
        }
    ], []);

    const animateNumbers = useCallback(() => {
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 fps
        const stepTime = duration / steps;

        stats.forEach((stat) => {
            if (stat.type === 'single') {
                let currentValue = 0;
                const increment = stat.value / steps;

                const timer = setInterval(() => {
                    currentValue += increment;

                    if (currentValue >= stat.value) {
                        currentValue = stat.value;
                        clearInterval(timer);
                    }

                    setAnimatedValues(prev => ({
                        ...prev,
                        [stat.key]: currentValue
                    }));
                }, stepTime);
            } else if (stat.type === 'dual') {
                // Animate first number
                let currentValue1 = 0;
                const increment1 = stat.value1 / steps;

                const timer1 = setInterval(() => {
                    currentValue1 += increment1;

                    if (currentValue1 >= stat.value1) {
                        currentValue1 = stat.value1;
                        clearInterval(timer1);
                    }

                    setAnimatedValues(prev => ({
                        ...prev,
                        [`${stat.key}24`]: currentValue1
                    }));
                }, stepTime);

                // Animate second number
                let currentValue2 = 0;
                const increment2 = stat.value2 / steps;

                const timer2 = setInterval(() => {
                    currentValue2 += increment2;

                    if (currentValue2 >= stat.value2) {
                        currentValue2 = stat.value2;
                        clearInterval(timer2);
                    }

                    setAnimatedValues(prev => ({
                        ...prev,
                        [`${stat.key}7`]: currentValue2
                    }));
                }, stepTime);
            }
        });
    }, [stats]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    animateNumbers();
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible, animateNumbers]);

    const formatValue = (key, value) => {
        if (key === 'pets') {
            return value.toFixed(1);
        }
        return Math.round(value);
    };


};

export default Stats;