import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  categoriesInPage?: Array<{
    name: string;
    count: number;
    orderRange: string;
  }>;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  categoriesInPage = []
}) => {
  const { theme } = useTheme();

  const renderPageButton = (page: number, isActive: boolean = false) => (
    <TouchableOpacity
      key={page}
      style={[
        styles.pageButton,
        {
          backgroundColor: isActive ? theme.primary50 : theme.grey10,
          borderColor: theme.primary50,
        }
      ]}
      onPress={() => onPageChange(page)}
      disabled={isActive}
    >
      <Text
        style={[
          styles.pageButtonText,
          { color: isActive ? theme.highLight : theme.primary50 }
        ]}
      >
        {page}
      </Text>
    </TouchableOpacity>
  );

  const renderPageButtons = () => {
    const buttons: React.ReactNode[] = [];
    const maxButtons = 5;
    
    if (totalPages <= maxButtons) {
      // Se tem poucas páginas, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i, i === currentPage));
      }
    } else {
      // Lógica para muitas páginas
      if (currentPage <= 3) {
        // Início: 1, 2, 3, 4, ..., total
        for (let i = 1; i <= 4; i++) {
          buttons.push(renderPageButton(i, i === currentPage));
        }
        if (totalPages > 4) {
          buttons.push(
            <Text key="ellipsis1" style={[styles.ellipsis, { color: theme.primary50 }]}>
              ...
            </Text>
          );
          buttons.push(renderPageButton(totalPages));
        }
      } else if (currentPage >= totalPages - 2) {
        // Final: 1, ..., total-3, total-2, total-1, total
        buttons.push(renderPageButton(1));
        if (totalPages > 4) {
          buttons.push(
            <Text key="ellipsis2" style={[styles.ellipsis, { color: theme.primary50 }]}>
              ...
            </Text>
          );
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          buttons.push(renderPageButton(i, i === currentPage));
        }
      } else {
        // Meio: 1, ..., current-1, current, current+1, ..., total
        buttons.push(renderPageButton(1));
        buttons.push(
          <Text key="ellipsis3" style={[styles.ellipsis, { color: theme.primary50 }]}>
            ...
          </Text>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(renderPageButton(i, i === currentPage));
        }
        buttons.push(
          <Text key="ellipsis4" style={[styles.ellipsis, { color: theme.primary50 }]}>
            ...
          </Text>
        );
        buttons.push(renderPageButton(totalPages));
      }
    }
    
    return buttons;
  };

  if (totalPages <= 1) {
    return null; // Não mostra paginação se só tem 1 página
  }

  return (
    <View style={styles.container}>
      {/* Informações da página atual */}
      <View style={styles.pageInfoContainer}>
        <Text style={[styles.pageInfoText, { color: theme.primary100 }]}>
          Página {currentPage} de {totalPages}
        </Text>
        {categoriesInPage.length > 0 && (
          <Text style={[styles.categoriesText, { color: theme.grey20 }]}>
            Categorias: {categoriesInPage.map(cat => `${cat.name} (${cat.count})`).join(', ')}
          </Text>
        )}
      </View>

      {/* Controles de navegação */}
      <View style={styles.navigationContainer}>
        {/* Botão Anterior */}
        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: currentPage > 1 ? theme.primary50 : theme.grey20,
              opacity: currentPage > 1 ? 1 : 0.5,
            }
          ]}
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <Text style={[styles.navButtonText, { color: theme.highLight }]}>
            ←
          </Text>
        </TouchableOpacity>

        {/* Botões de páginas */}
        <View style={styles.pageButtonsContainer}>
          {renderPageButtons()}
        </View>

        {/* Botão Próximo */}
        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: currentPage < totalPages ? theme.primary50 : theme.grey20,
              opacity: currentPage < totalPages ? 1 : 0.5,
            }
          ]}
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <Text style={[styles.navButtonText, { color: theme.highLight }]}>
            →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  pageInfoContainer: {
    alignItems: 'center',
    gap: 4,
  },
  pageInfoText: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
  },
  categoriesText: {
    fontSize: 12,
    fontFamily: 'primaryRegular',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontFamily: 'primaryBold',
  },
  pageButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pageButtonText: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
  },
  ellipsis: {
    fontSize: 16,
    fontFamily: 'primaryBold',
    paddingHorizontal: 4,
  },
});
