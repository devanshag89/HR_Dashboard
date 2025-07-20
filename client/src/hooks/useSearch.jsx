import { useState, useMemo, useCallback } from 'react';

export const useSearch = (data, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilters, setDepartmentFilters] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);

  // Get unique departments from data
  const departments = useMemo(() => {
    if (!data || data.length === 0) return [];
    const uniqueDepts = [...new Set(data.map(item => item.company?.department).filter(Boolean))];
    return uniqueDepts.sort();
  }, [data]);

  // Get unique ratings from data
  const ratings = useMemo(() => {
    if (!data || data.length === 0) return [];
    const uniqueRatings = [...new Set(data.map(item => item.rating).filter(Boolean))];
    return uniqueRatings.sort((a, b) => b - a); // Sort descending (5 to 1)
  }, [data]);

  // Helper function to get nested object values
  const getNestedValue = useCallback((obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter(item => {
      // Search functionality
      const searchMatch = searchTerm === '' || searchFields.some(field => {
        const fieldValue = getNestedValue(item, field);
        return fieldValue && fieldValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Department filter
      const departmentMatch = departmentFilters.length === 0 || 
        departmentFilters.includes(item.company?.department);

      // Rating filter
      const ratingMatch = ratingFilters.length === 0 || 
        ratingFilters.includes(item.rating);

      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [data, searchTerm, searchFields, departmentFilters, ratingFilters, getNestedValue]);

  // Toggle department filter
  const toggleDepartmentFilter = useCallback((department) => {
    setDepartmentFilters(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  }, []);

  // Toggle rating filter
  const toggleRatingFilter = useCallback((rating) => {
    setRatingFilters(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setDepartmentFilters([]);
    setRatingFilters([]);
  }, []);

  // Set multiple department filters at once
  const setDepartmentFiltersMultiple = useCallback((departments) => {
    setDepartmentFilters(departments);
  }, []);

  // Set multiple rating filters at once
  const setRatingFiltersMultiple = useCallback((ratings) => {
    setRatingFilters(ratings);
  }, []);

  // Get active filters count
  const activeFiltersCount = useMemo(() => 
    departmentFilters.length + ratingFilters.length + (searchTerm ? 1 : 0),
    [departmentFilters.length, ratingFilters.length, searchTerm]
  );

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => 
    activeFiltersCount > 0,
    [activeFiltersCount]
  );

  // Get filter summary for display
  const filterSummary = useMemo(() => {
    const summary = [];
    if (searchTerm) summary.push(`Search: "${searchTerm}"`);
    if (departmentFilters.length > 0) {
      summary.push(`Departments: ${departmentFilters.join(', ')}`);
    }
    if (ratingFilters.length > 0) {
      summary.push(`Ratings: ${ratingFilters.join(', ')}`);
    }
    return summary;
  }, [searchTerm, departmentFilters, ratingFilters]);

  return {
    // State
    searchTerm,
    departmentFilters,
    ratingFilters,
    
    // Data
    filteredData,
    departments,
    ratings,
    
    // Actions
    setSearchTerm,
    toggleDepartmentFilter,
    toggleRatingFilter,
    setDepartmentFiltersMultiple,
    setRatingFiltersMultiple,
    clearFilters,
    
    // Utils
    activeFiltersCount,
    hasActiveFilters,
    filterSummary,
    getNestedValue
  };
};